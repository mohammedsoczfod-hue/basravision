"use client";

import { Battery, Signal, Navigation, ShieldCheck, Cpu } from "lucide-react";
import FadeIn from "./FadeIn";

export default function HUD({ dict }: { dict: any }) {
    return (
        <div className="absolute inset-0 pointer-events-none z-20">
            {/* Top Bar HUD - Moved to top left/right to avoid center title */}
            <div className="absolute top-6 left-0 right-0 px-8 flex justify-between items-start">
                <FadeIn direction="down" delay={0.8}>
                    <div className="bg-grey-dark/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex items-center gap-6 rtl:gap-reverse text-[10px] uppercase tracking-widest text-accent font-bold shadow-2xl">
                        {/* Power & Comms Container */}
                        <div className="flex items-center gap-6 rtl:gap-reverse border-r border-white/10 pr-6 rtl:border-r-0 rtl:border-l rtl:pr-0 rtl:pl-6">
                            <div className="flex items-center gap-2">
                                <Battery className="w-4 h-4 text-green-400" />
                                <span>89%</span>
                            </div>
                            <div className="hidden sm:flex items-center gap-2">
                                <Signal className="w-4 h-4 text-blue-400" />
                                <span>5.8 GHZ</span>
                            </div>
                        </div>

                        {/* Telemetry Container (Speed & Altitude) */}
                        <div className="flex items-center gap-6 rtl:gap-reverse">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[8px] text-white/40 leading-none">{dict.hud.altitude}</span>
                                <span className="text-white text-xs font-mono">125.4 M</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[8px] text-white/40 leading-none">SPEED</span>
                                <span className="text-blue-400 text-xs font-mono">42 KM/H</span>
                            </div>
                        </div>

                        {/* GPS (Hidden on small mobile) */}
                        <div className="hidden md:flex items-center gap-2 text-white border-l border-white/10 pl-6 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-6">
                            <Navigation className="w-4 h-4 text-accent" />
                            <span>{dict.hud.gps}: {dict.hud.stable}</span>
                        </div>
                    </div>
                </FadeIn>

                <FadeIn direction="down" delay={1.0}>
                    <div className="bg-grey-dark/80 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex items-center space-x-4 rtl:space-x-reverse text-[10px] uppercase tracking-widest shadow-2xl">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-white font-bold">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span>LIVE FEED</span>
                        </div>
                        <div className="text-white opacity-50 font-mono">4K | 60FPS</div>
                    </div>
                </FadeIn>
            </div>

            {/* Side HUD Elements Removed as they are now in the top bar */}

            {/* Hidden right side HUD to keep it clean in RTL */}
            <div className="absolute top-1/3 bottom-0 right-12 flex flex-col justify-center gap-8 hidden">
                {/* Reserved for future expansion */}
            </div>

            {/* Bottom HUD - Status Card */}
            <div className="absolute bottom-12 right-12 hidden lg:block ltr:right-12 rtl:left-12 rtl:right-auto">
                <FadeIn direction="up" delay={1.6}>
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl w-64">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-2 bg-accent/20 rounded-lg">
                                <ShieldCheck className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm uppercase">{dict.hud.mode}</h4>
                                <p className="text-accent text-xs font-bold tracking-widest">{dict.hud.auto}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] text-white/50 uppercase tracking-widest">
                                <span>System</span>
                                <span className="text-green-400 font-bold">Optimal</span>
                            </div>
                            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                <div className="bg-accent h-full w-2/3" />
                            </div>
                            <div className="flex justify-between text-[10px] text-white/50 uppercase tracking-widest">
                                <span>Proc Unit</span>
                                <span className="text-white font-bold">VPU-X1</span>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* HUD Corner Accents - Hidden on mobile */}
            <div className="hidden md:block absolute top-0 left-0 w-32 h-32 border-l border-t border-accent/20 rounded-tl-3xl m-8 pointer-events-none" />
            <div className="hidden md:block absolute top-0 right-0 w-32 h-32 border-r border-t border-accent/20 rounded-tr-3xl m-8 pointer-events-none" />
            <div className="hidden md:block absolute bottom-0 left-0 w-32 h-32 border-l border-b border-accent/20 rounded-bl-3xl m-8 pointer-events-none" />
            <div className="hidden md:block absolute bottom-0 right-0 w-32 h-32 border-r border-b border-accent/20 rounded-br-3xl m-8 pointer-events-none" />
        </div>
    );
}
