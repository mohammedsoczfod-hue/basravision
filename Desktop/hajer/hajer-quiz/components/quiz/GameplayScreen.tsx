'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NEW_QUESTIONS, Question } from '@/data/quizData';
import { ALL_QUESTIONS } from '@/data/allQuestions';
import { Timer, CheckCircle2, XCircle } from 'lucide-react';

function shuffleArray<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

interface GameplayScreenProps {
    playerName: string;
    category: 'main' | 'new';
    onUpdateProgress: (score: number, index: number, isFinished: boolean) => void;
    onFinish: () => void;
}

const QUESTION_TIME = 20;

export const GameplayScreen = ({ playerName, category, onUpdateProgress, onFinish }: GameplayScreenProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const questions = useMemo(() => {
        const source = category === 'new' ? NEW_QUESTIONS : (ALL_QUESTIONS as unknown as Question[]);
        return shuffleArray(source);
    }, [category]);
    const currentQuestion = questions[currentIndex];

    useEffect(() => {
        if (isAnswered) return;
        if (timeLeft <= 0) { handleAnswer(null); return; }
        timerRef.current = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [timeLeft, isAnswered]);

    const handleAnswer = (option: string | null) => {
        if (isAnswered) return;
        setIsAnswered(true);
        setSelectedOption(option);
        let newScore = score;
        if (option === currentQuestion.correctAnswer) {
            newScore += 10 + timeLeft;
            setScore(newScore);
        }
        onUpdateProgress(newScore, currentIndex + 1, false);
        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setTimeLeft(QUESTION_TIME);
                setIsAnswered(false);
                setSelectedOption(null);
            } else {
                onUpdateProgress(newScore, questions.length, true);
                onFinish();
            }
        }, 2000);
    };

    const timerPercent = (timeLeft / QUESTION_TIME) * 100;
    const timerColor = timeLeft > 10 ? '#2563eb' : timeLeft > 5 ? '#d97706' : '#dc2626';

    return (
        <div className="w-full" dir="rtl">
            <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
                className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                    <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Timer style={{ color: timerColor, width: 22, height: 22 }} />
                        <span style={{ color: timerColor, fontFamily: 'monospace', fontWeight: 800, fontSize: 22, minWidth: '30px' }}>{timeLeft}</span>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#64748b', fontSize: 12, fontWeight: 600, marginBottom: 2 }}>السؤال الحالي</div>
                    <div style={{ color: '#1e3a8a', fontWeight: 800, fontSize: 16 }}>{currentIndex + 1} من {questions.length}</div>
                </div>
                <div style={{ textAlign: 'left' }}>
                    <div style={{ color: '#64748b', fontSize: 12, fontWeight: 600, marginBottom: 2 }}>نقاطك</div>
                    <div style={{ color: '#059669', fontWeight: 800, fontSize: 22 }}>{score}</div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div key={currentIndex} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                    style={{ background: '#ffffff', border: '2px solid #e5e7eb', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                    <div style={{ height: 6, background: '#f1f5f9' }}>
                        <motion.div style={{ height: '100%', background: timerColor }}
                            initial={{ width: '100%' }} animate={{ width: `${timerPercent}%` }} transition={{ duration: 1, ease: 'linear' }} />
                    </div>
                    <div style={{ padding: '32px 24px 20px' }}>
                        <h2 style={{ color: '#111827', fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 800, lineHeight: 1.5 }}>
                            {currentQuestion.question}
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, padding: '0 24px 32px' }}>
                        {currentQuestion.options.map((option, idx) => {
                            const isCorrect = option === currentQuestion.correctAnswer;
                            const isSelected = option === selectedOption;
                            let bg = '#ffffff', border = '2px solid #e5e7eb', textColor = '#374151';
                            if (isAnswered) {
                                if (isCorrect) { bg = '#f0fdf4'; border = '2px solid #22c55e'; textColor = '#166534'; }
                                else if (isSelected) { bg = '#fef2f2'; border = '2px solid #ef4444'; textColor = '#991b1b'; }
                                else { bg = '#f9fafb'; border = '2px solid #f3f4f6'; textColor = '#9ca3af'; }
                            }
                            return (
                                <button key={idx} onClick={() => handleAnswer(option)} disabled={isAnswered}
                                    style={{ background: bg, border, borderRadius: 18, padding: '18px 24px', cursor: isAnswered ? 'default' : 'pointer', textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, transition: 'all 0.2s', boxShadow: isAnswered ? 'none' : '0 4px 6px -1px rgba(0,0,0,0.05)' }}
                                    onMouseEnter={e => { if (!isAnswered) { (e.currentTarget as HTMLButtonElement).style.borderColor = '#3b82f6'; (e.currentTarget as HTMLButtonElement).style.background = '#f8faff'; } }}
                                    onMouseLeave={e => { if (!isAnswered) { (e.currentTarget as HTMLButtonElement).style.borderColor = '#e5e7eb'; (e.currentTarget as HTMLButtonElement).style.background = '#ffffff'; } }}>
                                    <span style={{ color: textColor, fontSize: '18px', fontWeight: 700 }}>{option}</span>
                                    {isAnswered && isCorrect && <CheckCircle2 style={{ color: '#22c55e', width: 24, height: 24, flexShrink: 0 }} />}
                                    {isAnswered && isSelected && !isCorrect && <XCircle style={{ color: '#ef4444', width: 24, height: 24, flexShrink: 0 }} />}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
