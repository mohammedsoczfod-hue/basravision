'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface JoinScreenProps {
    onJoin: (name: string, category: 'main' | 'new') => void;
}

export const JoinScreen = ({ onJoin }: JoinScreenProps) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) onJoin(name.trim(), 'main');
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            padding: '20px',
            position: 'relative'
        }}>
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                opacity: 0.15,
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l5.878 18.09h19.022l-15.39 11.18 5.878 18.09L30 36.18l-15.39 11.18 5.878-18.09L5.1 18.09h19.022L30 0z' fill='%2360a5fa' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                pointerEvents: 'none',
                zIndex: -1
            }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    width: '100%',
                    maxWidth: 500,
                    background: '#f8f9fa',
                    borderRadius: '30px',
                    padding: '40px 30px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    border: '8px solid transparent',
                    borderImage: 'linear-gradient(to bottom, #d4af37, #f1d592) 1',
                    position: 'relative',
                    overflow: 'hidden',
                    textAlign: 'center',
                    direction: 'rtl'
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '100%',
                    background: '#ffffff',
                    clipPath: 'polygon(50% 0%, 100% 15%, 100% 100%, 0 100%, 0 15%)',
                    zIndex: 0
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: '40px', color: '#1e3a8a', fontWeight: 900, marginBottom: '10px', fontFamily: 'serif' }}>
                        رمضان كريم
                    </div>
                    <div style={{ color: '#4b5563', fontSize: '18px', fontWeight: 600, marginBottom: '5px' }}>يقيم</div>
                    <h2 style={{ color: '#111827', fontSize: '24px', fontWeight: 800, marginBottom: '5px' }}>
                        تجمع شباب شط العرب
                    </h2>
                    <h3 style={{ color: '#2563eb', fontSize: '26px', fontWeight: 900, marginBottom: '15px' }}>
                        المسابقة الرمضانية الثالثة
                    </h3>
                    <div style={{ color: '#1f2937', fontSize: '18px', fontWeight: 700, marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
                        لعام 1447 هـ - 2026 م
                    </div>
                    <div style={{ color: '#059669', fontSize: '16px', fontWeight: 700, marginBottom: '30px', background: '#ecfdf5', padding: '10px', borderRadius: '10px', border: '1px solid #10b981' }}>
                        البرنامج التدريبي لفريق حجر بن عدي
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                            <label style={{ display: 'block', color: '#374151', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                                ادخل اسمك للمشاركة في المسابقة:
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="اسم المتسابق..."
                                required
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    borderRadius: '15px',
                                    background: '#f3f4f6',
                                    border: '2px solid #d1d5db',
                                    fontSize: '16px',
                                    outline: 'none',
                                    color: '#111827',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '15px',
                                background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
                                color: '#ffffff',
                                fontSize: '18px',
                                fontWeight: 800,
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 8px 16px -3px rgba(37, 99, 235, 0.4)',
                                transition: 'transform 0.2s',
                                letterSpacing: '0.5px'
                            }}
                        >
                            ابدأ المسابقة 🏆
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};
