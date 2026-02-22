'use client';

import { useState } from 'react';
import { useRealtimeQuiz } from '@/hooks/useRealtimeQuiz';
import { JoinScreen } from '@/components/quiz/JoinScreen';
import { GameplayScreen } from '@/components/quiz/GameplayScreen';
import { LiveLeaderboard } from '@/components/quiz/LiveLeaderboard';
import { ResultsScreen } from '@/components/quiz/ResultsScreen';
import { AnimatePresence, motion } from 'framer-motion';

export function QuizClient() {
    const [gameState, setGameState] = useState<'join' | 'play' | 'results'>('join');
    const [playerName, setPlayerName] = useState('');
    const [category, setCategory] = useState<'main' | 'new'>('main');
    const { players, currentPlayer, updateProgress } = useRealtimeQuiz(playerName);

    const handleJoin = (name: string, selectedCategory: 'main' | 'new') => {
        setPlayerName(name);
        setCategory(selectedCategory);
        setGameState('play');
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f3f4f6',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0l10 30h30l-24 18 9 30-25-18-25 18 9-30-24-18h30z' fill='%23d1d5db' fill-opacity='0.1'/%3E%3C/svg%3E")`,
            padding: 'clamp(12px, 3vw, 32px)',
            fontFamily: "'Cairo', system-ui, sans-serif"
        }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <AnimatePresence mode="wait">
                    {gameState === 'join' && (
                        <motion.div key="join" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <JoinScreen onJoin={handleJoin} />
                        </motion.div>
                    )}

                    {gameState === 'play' && (
                        <motion.div key="play" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <style>{`
                                @media (min-width: 1024px) {
                                    .quiz-grid-container { grid-template-columns: 1fr 350px !important; }
                                }
                            `}</style>
                            <div className="quiz-grid-container" style={{ display: 'grid', gap: 24, direction: 'rtl' }}>
                                <div style={{ minWidth: 0 }}>
                                    <div style={{ marginBottom: 16, padding: '12px 20px', background: '#fff', borderRadius: 16, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
                                        <span style={{ fontSize: 24 }}>🕌</span>
                                        <span style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '1.2rem' }}>
                                            البرنامج التدريبي لفريق حجر بن عدي
                                        </span>
                                    </div>
                                    <GameplayScreen
                                        playerName={playerName}
                                        category={category}
                                        onUpdateProgress={updateProgress}
                                        onFinish={() => setGameState('results')}
                                    />
                                </div>
                                <div>
                                    <div style={{ color: '#1e3a8a', fontWeight: 800, fontSize: 20, marginBottom: 15, textAlign: 'right', paddingRight: 8 }}>المنافسون</div>
                                    <LiveLeaderboard players={players} currentPlayerId={currentPlayer?.id} />
                                    <div style={{ marginTop: 16, padding: '16px', borderRadius: 16, background: '#fff', border: '1px solid #d1d5db', color: '#4b5563', fontSize: 13, direction: 'rtl', lineHeight: 1.6 }}>
                                        <div style={{ fontWeight: 700, color: '#2563eb', marginBottom: 4 }}>💡 معلومة سريعة:</div>
                                        كلما أجبت أسرع، زادت نقاطك! لوحة الصدارة تتحدث تلقائياً.
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {gameState === 'results' && currentPlayer && (
                        <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <ResultsScreen score={currentPlayer.score} players={players} currentPlayerId={currentPlayer.id} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
