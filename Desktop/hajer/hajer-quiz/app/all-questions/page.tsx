'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_QUESTIONS, AllQuestion } from '@/data/allQuestions';

/* ────────────────────────────────── helpers ── */
function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const TIMER = 25; // seconds per question

/* ────────────────────────────────── types ── */
type Phase = 'start' | 'quiz' | 'result';

/* ────────────────────────────────── component ── */
export default function AllQuestionsPage() {
    const [phase, setPhase] = useState<Phase>('start');
    const [playerName, setPlayerName] = useState('');
    const [questions, setQuestions] = useState<AllQuestion[]>([]);
    const [idx, setIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIMER);
    const [chosen, setChosen] = useState<string | null>(null);
    const [textAnswer, setTextAnswer] = useState('');
    const [answered, setAnswered] = useState(false);
    const [wrongCount, setWrongCount] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const current = questions[idx] as AllQuestion | undefined;
    const isOpenEnded = current && current.options.length === 0;
    const progress = questions.length ? ((idx) / questions.length) * 100 : 0;

    /* start quiz */
    const startQuiz = () => {
        if (!playerName.trim()) return;
        setQuestions(shuffle(ALL_QUESTIONS));
        setIdx(0);
        setScore(0);
        setWrongCount(0);
        setTimeLeft(TIMER);
        setChosen(null);
        setTextAnswer('');
        setAnswered(false);
        setPhase('quiz');
    };

    /* timer */
    useEffect(() => {
        if (phase !== 'quiz' || answered) return;
        timerRef.current = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timerRef.current!);
                    autoAdvance();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase, idx, answered]);

    const autoAdvance = () => {
        setAnswered(true);
        setWrongCount(w => w + 1);
        setTimeout(advance, 1800);
    };

    const advance = () => {
        setIdx(i => {
            const next = i + 1;
            if (next >= questions.length) {
                setPhase('result');
                return i;
            }
            return next;
        });
        setChosen(null);
        setTextAnswer('');
        setAnswered(false);
        setTimeLeft(TIMER);
    };

    /* answer MCQ */
    const handleChoose = (opt: string) => {
        if (answered) return;
        clearInterval(timerRef.current!);
        setChosen(opt);
        setAnswered(true);
        if (current && opt === current.correctAnswer) {
            setScore(s => s + 1);
        } else {
            setWrongCount(w => w + 1);
        }
        setTimeout(advance, 1600);
    };

    /* answer open-ended */
    const handleOpenSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (answered || !textAnswer.trim()) return;
        clearInterval(timerRef.current!);
        setAnswered(true);
        const isCorrect = textAnswer.trim().replace(/\s+/g, ' ') ===
            current?.correctAnswer.replace(/\s+/g, ' ');
        if (isCorrect) setScore(s => s + 1);
        else setWrongCount(w => w + 1);
        setTimeout(advance, 1800);
    };

    const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;
    const timerPct = (timeLeft / TIMER) * 100;
    const timerColor = timeLeft > 10 ? '#10b981' : timeLeft > 5 ? '#f59e0b' : '#ef4444';

    /* ── PHASE: start ── */
    if (phase === 'start') return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 60%,#0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, direction: 'rtl' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: 480, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', borderRadius: 28, padding: '40px 32px', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                {/* badge */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                    <div style={{ background: 'linear-gradient(135deg,#d4af37,#f1d592)', borderRadius: 50, width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>📚</div>
                </div>
                <h1 style={{ textAlign: 'center', color: '#f1d592', fontSize: 28, fontWeight: 900, marginBottom: 6 }}>جميع الأسئلة</h1>
                <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: 15, marginBottom: 6 }}>البرنامج التدريبي لفريق حجر بن عدي</p>
                <div style={{ textAlign: 'center', background: 'rgba(16,185,129,0.15)', borderRadius: 10, padding: '8px 16px', marginBottom: 28, border: '1px solid rgba(16,185,129,0.3)' }}>
                    <span style={{ color: '#34d399', fontWeight: 700, fontSize: 15 }}>122 سؤال شامل • {TIMER} ثانية لكل سؤال</span>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <label style={{ color: '#cbd5e1', fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 8 }}>ادخل اسمك:</label>
                    <input
                        value={playerName}
                        onChange={e => setPlayerName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && startQuiz()}
                        placeholder="اسم المتسابق..."
                        style={{ width: '100%', padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 16, outline: 'none', boxSizing: 'border-box' }}
                    />
                </div>
                <button
                    onClick={startQuiz}
                    disabled={!playerName.trim()}
                    style={{ width: '100%', padding: '16px', borderRadius: 16, background: playerName.trim() ? 'linear-gradient(135deg,#d4af37,#b8860b)' : '#374151', color: '#fff', fontSize: 18, fontWeight: 800, border: 'none', cursor: playerName.trim() ? 'pointer' : 'not-allowed', boxShadow: playerName.trim() ? '0 8px 20px rgba(212,175,55,0.4)' : 'none', transition: 'all 0.2s' }}
                >
                    ابدأ الاختبار الشامل 🚀
                </button>
            </motion.div>
        </div>
    );

    /* ── PHASE: result ── */
    if (phase === 'result') {
        const star = pct >= 80 ? '🥇' : pct >= 60 ? '🥈' : pct >= 40 ? '🥉' : '📖';
        const msg = pct >= 80 ? 'ممتاز! أداء رائع!' : pct >= 60 ? 'جيد جداً! استمر!' : pct >= 40 ? 'جيد! يمكنك التحسن!' : 'تحتاج إلى مزيد من المراجعة';
        return (
            <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f172a,#1e3a8a,#0f172a)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, direction: 'rtl' }}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ width: '100%', maxWidth: 500, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', borderRadius: 28, padding: '40px 32px', border: '1px solid rgba(255,255,255,0.15)', textAlign: 'center' }}>
                    <div style={{ fontSize: 72, marginBottom: 16 }}>{star}</div>
                    <h2 style={{ color: '#f1d592', fontSize: 26, fontWeight: 900, marginBottom: 8 }}>انتهى الاختبار يا {playerName}!</h2>
                    <p style={{ color: '#94a3b8', marginBottom: 28 }}>{msg}</p>
                    {/* score circle */}
                    <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 28px' }}>
                        <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
                            <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
                            <circle cx="70" cy="70" r="60" fill="none" stroke="#d4af37" strokeWidth="12"
                                strokeDasharray={`${2 * Math.PI * 60}`}
                                strokeDashoffset={`${2 * Math.PI * 60 * (1 - pct / 100)}`}
                                strokeLinecap="round"
                                style={{ transition: 'stroke-dashoffset 1s ease' }} />
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#f1d592', fontSize: 32, fontWeight: 900 }}>{pct}%</span>
                        </div>
                    </div>
                    {/* stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 28 }}>
                        {[
                            { label: 'صحيح', val: score, color: '#10b981' },
                            { label: 'خطأ', val: wrongCount, color: '#ef4444' },
                            { label: 'المجموع', val: questions.length, color: '#f1d592' },
                        ].map(s => (
                            <div key={s.label} style={{ background: `rgba(${s.color === '#10b981' ? '16,185,129' : s.color === '#ef4444' ? '239,68,68' : '241,213,146'},0.1)`, borderRadius: 14, padding: '14px 8px', border: `1px solid ${s.color}30` }}>
                                <div style={{ color: s.color, fontSize: 26, fontWeight: 900 }}>{s.val}</div>
                                <div style={{ color: '#94a3b8', fontSize: 12 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <button onClick={() => { setPhase('start'); }} style={{ flex: 1, padding: '14px', borderRadius: 14, background: 'rgba(255,255,255,0.08)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.15)', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>← تغيير الاسم</button>
                        <button onClick={startQuiz} style={{ flex: 2, padding: '14px', borderRadius: 14, background: 'linear-gradient(135deg,#d4af37,#b8860b)', color: '#fff', border: 'none', fontSize: 16, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 20px rgba(212,175,55,0.35)' }}>إعادة الاختبار 🔄</button>
                    </div>
                </motion.div>
            </div>
        );
    }

    /* ── PHASE: quiz ── */
    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f172a,#1e3a8a,#0f172a)', padding: '16px', direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* top bar */}
            <div style={{ width: '100%', maxWidth: 680, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ color: '#94a3b8', fontSize: 13 }}>السؤال {idx + 1} من {questions.length}</span>
                        <span style={{ color: '#f1d592', fontSize: 13, fontWeight: 700 }}>✅ {score} صح  ❌ {wrongCount} خطأ</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 99 }}>
                        <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#10b981,#3b82f6)', borderRadius: 99, transition: 'width 0.3s' }} />
                    </div>
                </div>
                {/* timer circle */}
                <div style={{ position: 'relative', width: 52, height: 52, flexShrink: 0 }}>
                    <svg width="52" height="52" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                        <circle cx="26" cy="26" r="22" fill="none" stroke={timerColor} strokeWidth="4"
                            strokeDasharray={`${2 * Math.PI * 22}`}
                            strokeDashoffset={`${2 * Math.PI * 22 * (1 - timerPct / 100)}`}
                            strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s' }} />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: timerColor, fontSize: 15, fontWeight: 800 }}>{timeLeft}</div>
                </div>
            </div>

            {/* question card */}
            <AnimatePresence mode="wait">
                <motion.div key={idx} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.28 }}
                    style={{ width: '100%', maxWidth: 680, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', borderRadius: 22, padding: '28px 24px', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 50px rgba(0,0,0,0.4)', marginBottom: 14 }}>
                    {/* category badge */}
                    <div style={{ display: 'inline-block', background: isOpenEnded ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)', border: `1px solid ${isOpenEnded ? '#f59e0b40' : '#3b82f640'}`, borderRadius: 8, padding: '4px 12px', marginBottom: 14, fontSize: 12, color: isOpenEnded ? '#fbbf24' : '#60a5fa', fontWeight: 700 }}>
                        {isOpenEnded ? '✏️ سؤال مفتوح' : '🎯 اختيار من متعدد'}
                    </div>
                    <h2 style={{ color: '#f8fafc', fontSize: 18, fontWeight: 700, lineHeight: 1.6, marginBottom: 24 }}>{current?.question}</h2>

                    {/* MCQ options */}
                    {!isOpenEnded && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {current?.options.map((opt, i) => {
                                const isCorrect = answered && opt === current.correctAnswer;
                                const isWrong = answered && opt === chosen && opt !== current.correctAnswer;
                                return (
                                    <motion.button key={i} whileHover={!answered ? { scale: 1.015 } : {}} whileTap={!answered ? { scale: 0.98 } : {}}
                                        onClick={() => handleChoose(opt)}
                                        style={{
                                            padding: '14px 18px', borderRadius: 14, textAlign: 'right', fontSize: 15, fontWeight: 600, border: '1.5px solid',
                                            borderColor: isCorrect ? '#10b981' : isWrong ? '#ef4444' : 'rgba(255,255,255,0.15)',
                                            background: isCorrect ? 'rgba(16,185,129,0.2)' : isWrong ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)',
                                            color: isCorrect ? '#34d399' : isWrong ? '#fca5a5' : '#e2e8f0',
                                            cursor: answered ? 'default' : 'pointer', transition: 'all 0.2s',
                                            display: 'flex', alignItems: 'center', gap: 10
                                        }}>
                                        <span style={{ minWidth: 28, height: 28, borderRadius: '50%', background: isCorrect ? '#10b981' : isWrong ? '#ef4444' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: isCorrect || isWrong ? '#fff' : '#94a3b8', flexShrink: 0 }}>
                                            {isCorrect ? '✓' : isWrong ? '✗' : ['أ', 'ب', 'ج', 'د'][i]}
                                        </span>
                                        {opt}
                                    </motion.button>
                                );
                            })}
                        </div>
                    )}

                    {/* Open-ended */}
                    {isOpenEnded && (
                        <form onSubmit={handleOpenSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <input
                                value={textAnswer}
                                onChange={e => setTextAnswer(e.target.value)}
                                placeholder="اكتب إجابتك هنا..."
                                disabled={answered}
                                autoFocus
                                style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 15, outline: 'none', direction: 'rtl' }}
                            />
                            {answered && (
                                <div style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)', color: '#f1d592', fontSize: 14, fontWeight: 600 }}>
                                    💡 الإجابة الصحيحة: {current?.correctAnswer}
                                </div>
                            )}
                            {!answered && (
                                <button type="submit" style={{ padding: '13px', borderRadius: 14, background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                                    تأكيد الإجابة ←
                                </button>
                            )}
                        </form>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* name tag */}
            <div style={{ color: '#475569', fontSize: 13, marginTop: 'auto', paddingTop: 10 }}>
                المتسابق: <span style={{ color: '#94a3b8', fontWeight: 700 }}>{playerName}</span>
            </div>
        </div>
    );
}
