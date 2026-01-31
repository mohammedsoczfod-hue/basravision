"use client";

import { motion } from "framer-motion";
import { Rocket, Search, Database, RotateCcw, ChevronRight } from "lucide-react";
import FadeIn from "../ui/FadeIn";

export default function MissionCycle({ dict }: { dict: any }) {
    const fullText = dict.tech.cycle || "";
    const mainTitle = fullText.includes(":") ? fullText.split(":")[0] : "Mission Cycle";
    const stepsText = fullText.includes(":") ? fullText.split(":")[1] : fullText;
    const parts = stepsText.split("→").map((p: string) => p.trim());

    const steps = [
        { title: parts[0] || "Launch", icon: Rocket, delay: 0.1 },
        { title: parts[1] || "Inspection", icon: Search, delay: 0.3 },
        { title: parts[2] || "Analysis", icon: Database, delay: 0.5 },
        { title: parts[3] || "Return", icon: RotateCcw, delay: 0.7 },
    ];

    return (
        <div className="bg-grey-dark text-white p-12 md:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden border border-white/5">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <FadeIn direction="up">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-20 text-center uppercase tracking-tighter">
                    {mainTitle}
                </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                {steps.map((step, i) => (
                    <div key={i} className="relative flex flex-col items-center group">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: step.delay, type: "spring" }}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            className="w-28 h-28 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center text-accent mb-8 shadow-2xl transition-all group-hover:border-accent group-hover:bg-accent/5 group-hover:shadow-accent/20"
                        >
                            <step.icon className="w-12 h-12" />

                            {/* Pulse effect */}
                            <div className="absolute inset-0 rounded-3xl bg-accent/20 animate-ping opacity-0 group-hover:opacity-100" />
                        </motion.div>

                        <FadeIn direction="up" delay={step.delay + 0.2}>
                            <span className="font-extrabold text-2xl tracking-tight text-white/90 group-hover:text-white transition-colors">
                                {step.title}
                            </span>
                        </FadeIn>

                        {/* Connecting Arrows (Desktop) */}
                        {i < steps.length - 1 && (
                            <div className="hidden md:block absolute top-14 left-full w-full h-[2px] -z-10">
                                <div className="w-[60%] mx-auto h-full bg-gradient-to-r from-accent to-transparent opacity-20" />
                                <ChevronRight className="absolute top-1/2 left-full -translate-y-1/2 -translate-x-full w-6 h-6 text-accent/30" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* HUD Elements */}
            <div className="absolute top-8 left-8 text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
                System.Sequence.Active
            </div>
            <div className="absolute bottom-8 right-8 text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
                BasraVision.OS v2.4
            </div>
        </div>
    );
}
