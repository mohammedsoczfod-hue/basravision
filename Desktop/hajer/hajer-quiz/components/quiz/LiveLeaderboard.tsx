'use client';

import { Player } from '@/hooks/useRealtimeQuiz';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, CheckCircle2 } from 'lucide-react';
import { QUIZ_QUESTIONS } from '@/data/quizData';

interface LiveLeaderboardProps {
    players: Player[];
    currentPlayerId?: string;
}

export const LiveLeaderboard = ({ players, currentPlayerId }: LiveLeaderboardProps) => {
    const totalQuestions = QUIZ_QUESTIONS.length;

    return (
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, overflow: 'hidden' }} dir="rtl">
            <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Trophy style={{ width: 18, height: 18, color: '#f59e0b' }} />
                    <span style={{ color: '#ffffff', fontWeight: 700, fontSize: 16 }}>لوحة الصدارة</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#94a3b8', fontSize: 13 }}>
                    <Users style={{ width: 15, height: 15 }} />
                    <span>{players.length}</span>
                </div>
            </div>

            <div style={{ padding: 8, maxHeight: 380, overflowY: 'auto' }}>
                <AnimatePresence initial={false}>
                    {players.map((player, index) => {
                        const isMe = player.id === currentPlayerId;
                        const progress = (player.currentQuestionIndex / totalQuestions) * 100;
                        const medalColors: Record<number, string> = { 0: '#f59e0b', 1: '#94a3b8', 2: '#b45309' };
                        const medalBg = medalColors[index] ?? 'rgba(255,255,255,0.1)';

                        return (
                            <motion.div
                                key={player.id}
                                layout
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    padding: '10px 12px',
                                    borderRadius: 12,
                                    marginBottom: 6,
                                    border: isMe ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.05)',
                                    background: isMe ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.04)',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: medalBg, color: index < 3 ? '#000' : '#94a3b8', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                                            {index + 1}
                                        </span>
                                        <span style={{ color: isMe ? '#93c5fd' : '#e2e8f0', fontWeight: 600, fontSize: 14 }}>
                                            {player.name} {isMe && <span style={{ color: '#60a5fa', fontSize: 12 }}>(أنت)</span>}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        {player.isFinished && <CheckCircle2 style={{ width: 14, height: 14, color: '#34d399' }} />}
                                        <span style={{ color: '#34d399', fontWeight: 700, fontFamily: 'monospace', fontSize: 15 }}>{player.score}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                                        <motion.div
                                            style={{ height: '100%', background: player.isFinished ? '#34d399' : '#3b82f6', borderRadius: 4 }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <span style={{ color: '#64748b', fontSize: 10, flexShrink: 0 }}>{player.currentQuestionIndex}/{totalQuestions}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
                {players.length === 0 && (
                    <div style={{ padding: '24px 0', textAlign: 'center', color: '#475569', fontSize: 13, fontStyle: 'italic' }}>
                        في انتظار المتسابقين...
                    </div>
                )}
            </div>
        </div>
    );
};
