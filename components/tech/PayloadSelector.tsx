"use client";

import { useState } from "react";
import { Eye, ShieldAlert, Wind, ChevronRight } from "lucide-react";
import Image from "next/image";
import FadeIn from "../ui/FadeIn";
import clsx from "clsx";

type PayloadType = "ocr" | "thermal" | "gas";

export default function PayloadSelector({ dict }: { dict: any }) {
    const [activeTab, setActiveTab] = useState<PayloadType>("ocr");

    const payloads = [
        { id: "ocr", icon: Eye, img: "/tech_ocr.png", color: "text-blue-500", bg: "bg-blue-500/10" },
        { id: "thermal", icon: ShieldAlert, img: "/tech_thermal.png", color: "text-orange-500", bg: "bg-orange-500/10" },
        { id: "gas", icon: Wind, img: "/tech_dock.png", color: "text-green-500", bg: "bg-green-500/10" },
    ];

    return (
        <div className="flex flex-col gap-12">
            <div className="flex flex-wrap justify-center gap-4">
                {payloads.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => setActiveTab(p.id as PayloadType)}
                        className={clsx(
                            "flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300",
                            activeTab === p.id
                                ? "border-accent bg-accent text-white shadow-lg shadow-accent/20 scale-105"
                                : "border-grey-light bg-white text-grey-dark hover:border-accent/40"
                        )}
                    >
                        <p.icon className={clsx("w-6 h-6", activeTab === p.id ? "text-white" : p.color)} />
                        <span className="font-bold">{dict.payloads[p.id].name}</span>
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center bg-grey-light/50 p-8 rounded-[3rem] overflow-hidden border border-white">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
                    <Image
                        src={payloads.find(p => p.id === activeTab)?.img || ""}
                        alt={dict.payloads[activeTab].name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 flex items-center gap-2">
                        <span className="px-3 py-1 bg-accent rounded-full text-[10px] font-bold text-white uppercase tracking-widest">Active System</span>
                    </div>
                </div>

                <div className="space-y-8">
                    <FadeIn key={activeTab} direction="right" delay={0.2}>
                        <h3 className="text-3xl font-extrabold text-primary">{dict.payloads[activeTab].name}</h3>
                        <p className="text-lg text-grey-dark/80 leading-relaxed mt-4">
                            {dict.payloads[activeTab].desc}
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <FadeIn key={`${activeTab}-1`} direction="up" delay={0.4}>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-grey-light hover:border-accent/20 transition-colors">
                                <span className="text-[10px] text-grey-dark/50 uppercase tracking-widest block mb-2 font-bold">Performance</span>
                                <span className="text-lg font-bold text-primary">{dict.payloads[activeTab].spec1}</span>
                            </div>
                        </FadeIn>
                        <FadeIn key={`${activeTab}-2`} direction="up" delay={0.5}>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-grey-light hover:border-accent/20 transition-colors">
                                <span className="text-[10px] text-grey-dark/50 uppercase tracking-widest block mb-2 font-bold">Feature</span>
                                <span className="text-lg font-bold text-primary">{dict.payloads[activeTab].spec2}</span>
                            </div>
                        </FadeIn>
                    </div>

                    <div className="pt-8">
                        <button className="flex items-center gap-2 text-accent font-bold group">
                            <span>Download Technical PDF</span>
                            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
