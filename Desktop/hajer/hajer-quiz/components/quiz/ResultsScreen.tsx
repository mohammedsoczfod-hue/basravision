'use client';

import { motion } from 'framer-motion';
import { Trophy, RefreshCcw, Home } from 'lucide-react';
import { LiveLeaderboard } from './LiveLeaderboard';
import { Player } from '@/hooks/useRealtimeQuiz';
import Link from 'next/link';

interface ResultsScreenProps {
    score: number;
    players: Player[];
    currentPlayerId: string;
}

export const ResultsScreen = ({ score, players, currentPlayerId }: ResultsScreenProps) => {
    const myRank = players.findIndex(p => p.id === currentPlayerId) + 1;

    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-8" dir="rtl">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                    background: '#f8f9fa',
                    borderRadius: '30px',
                    padding: '40px 20px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    border: '4px solid #d4af37',
                    position: 'relative',
                    overflow: 'hidden',
                    textAlign: 'center'
                }}
            >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l5.878 18.09h19.022l-15.39 11.18 5.878 18.09L30 36.18l-15.39 11.18 5.878-18.09L5.1 18.09h19.022L30 0z' fill='%2360a5fa' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`, zIndex: 0 }} />

                <div className="relative z-10">
                    <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="inline-block p-4 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                        <Trophy className="w-16 h-16 text-yellow-600 mx-auto" />
                    </motion.div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-2">تهانينا!</h1>
                    <p className="text-gray-600 mb-2 font-bold">لقد أتممت المسابقة بنجاح</p>
                    <div style={{ color: '#059669', fontSize: '14px', fontWeight: 700, marginBottom: '30px', background: '#ecfdf5', padding: '5px 15px', borderRadius: '20px', display: 'inline-block', border: '1px solid #10b981' }}>
                        البرنامج التدريبي لفريق حجر بن عدي
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-10 max-w-sm mx-auto">
                        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                            <span className="text-gray-500 block text-xs mb-1">نقاطك</span>
                            <span className="text-3xl font-bold text-blue-600">{score}</span>
                        </div>
                        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                            <span className="text-gray-500 block text-xs mb-1">ترتيبك</span>
                            <span className="text-3xl font-bold text-gray-800">#{myRank}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button onClick={() => window.location.reload()} className="px-8 py-4 bg-gray-200 hover:bg-gray-300 rounded-xl font-bold text-gray-800 transition-all flex items-center justify-center gap-2">
                            <RefreshCcw className="w-5 h-5" />
                            إعادة المحاولة
                        </button>
                        <Link href="/" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg">
                            <Home className="w-5 h-5" />
                            الرئيسية
                        </Link>
                    </div>
                </div>
            </motion.div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold text-white px-2">ترتيب جميع المتسابقين</h3>
                <LiveLeaderboard players={players} currentPlayerId={currentPlayerId} />
            </div>
        </div>
    );
};
