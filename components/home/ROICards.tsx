"use client";

import { TrendingDown, Users, Leaf, Target } from "lucide-react";
import FadeIn from "../ui/FadeIn";

export default function ROICards({ dict }: { dict: any }) {
    const metrics = [
        {
            label: dict.roi.hours,
            value: "14,500+",
            sub: "per facility",
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            label: dict.roi.costs,
            value: "40%",
            sub: "avg. reduction",
            icon: TrendingDown,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
        {
            label: dict.roi.accuracy,
            value: "99.9%",
            sub: "OCR engine",
            icon: Target,
            color: "text-accent",
            bg: "bg-accent/10",
        },
        {
            label: dict.roi.carbon,
            value: "22%",
            sub: "lower footprint",
            icon: Leaf,
            color: "text-green-500",
            bg: "bg-green-500/10",
        },
    ];

    return (
        <section className="py-24 bg-grey-dark relative overflow-hidden">
            {/* Abstract Background Design */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <FadeIn direction="up">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 uppercase tracking-tight">
                            {dict.roi.title}
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed underline decoration-accent/40 decoration-4 underline-offset-8">
                            {dict.roi.subtitle}
                        </p>
                    </FadeIn>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {metrics.map((m, i) => (
                        <FadeIn key={i} direction="up" delay={i * 0.1}>
                            <div className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                                <div className={`${m.bg} ${m.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-white/5`}>
                                    <m.icon className="w-8 h-8" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-extrabold text-white tracking-tighter">
                                            {m.value}
                                        </span>
                                        <span className="text-xs text-accent font-bold uppercase tracking-widest">
                                            {m.sub}
                                        </span>
                                    </div>
                                    <h3 className="text-white/70 font-bold text-sm leading-tight group-hover:text-white transition-colors">
                                        {m.label}
                                    </h3>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
