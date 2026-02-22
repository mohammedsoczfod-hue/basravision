'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Player {
    id: string;
    name: string;
    score: number;
    currentQuestionIndex: number;
    isFinished: boolean;
    lastUpdate: number;
}

const CHANNEL_NAME = 'ramadan_quiz_realtime';

export const useRealtimeQuiz = (initialPlayerName?: string) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
        if (initialPlayerName && !currentPlayer) {
            const newPlayer: Player = {
                id: Math.random().toString(36).substring(2, 9),
                name: initialPlayerName,
                score: 0,
                currentQuestionIndex: 0,
                isFinished: false,
                lastUpdate: Date.now(),
            };
            setCurrentPlayer(newPlayer);
            const channel = new BroadcastChannel(CHANNEL_NAME);
            channel.postMessage({ type: 'PLAYER_JOINED', player: newPlayer });
            channel.close();
        }
    }, [initialPlayerName, currentPlayer]);

    useEffect(() => {
        const channel = new BroadcastChannel(CHANNEL_NAME);
        const handleMessage = (event: MessageEvent) => {
            const { type, player } = event.data;
            setPlayers((prev) => {
                let updated = [...prev];
                if (type === 'PLAYER_UPDATED' || type === 'PLAYER_JOINED') {
                    const index = updated.findIndex((p) => p.id === player.id);
                    if (index !== -1) { updated[index] = player; }
                    else { updated.push(player); }
                } else if (type === 'SYNC_REQUEST') {
                    if (currentPlayer) { channel.postMessage({ type: 'PLAYER_UPDATED', player: currentPlayer }); }
                }
                return updated;
            });
        };
        channel.onmessage = handleMessage;
        channel.postMessage({ type: 'SYNC_REQUEST' });
        return () => channel.close();
    }, [currentPlayer]);

    const updateProgress = useCallback((score: number, index: number, finished: boolean = false) => {
        if (!currentPlayer) return;
        const updatedPlayer = { ...currentPlayer, score, currentQuestionIndex: index, isFinished: finished, lastUpdate: Date.now() };
        setCurrentPlayer(updatedPlayer);
        const channel = new BroadcastChannel(CHANNEL_NAME);
        channel.postMessage({ type: 'PLAYER_UPDATED', player: updatedPlayer });
        channel.close();
        setPlayers((prev) => {
            const updated = [...prev];
            const idx = updated.findIndex((p) => p.id === updatedPlayer.id);
            if (idx !== -1) { updated[idx] = updatedPlayer; } else { updated.push(updatedPlayer); }
            return updated;
        });
    }, [currentPlayer]);

    return { players: players.sort((a, b) => b.score - a.score), currentPlayer, updateProgress };
};
