import { getDictionary } from "@/dictionaries/dictionaries";
import Header from "@/components/layout/Header";
import Image from "next/image";
import { Cpu, Zap, Thermometer, ShieldCheck } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import PayloadSelector from "@/components/tech/PayloadSelector";
import MissionCycle from "@/components/tech/MissionCycle";

export default async function Tech({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const techFeatures = [
        {
            title: dict.tech.sections.ocr,
            image: "/tech_ocr.png",
            icon: <Cpu className="w-10 h-10 text-accent" />,
            desc: "نظام متطور يعتمد على رؤية الحاسوب لقراءة العدادات التقليدية في المواقع البعيدة وتحويلها إلى بيانات رقمية فوراً.",
        },
        {
            title: dict.tech.sections.thermal,
            image: "/tech_thermal.png",
            icon: <Thermometer className="w-10 h-10 text-accent" />,
            desc: "كشف التسريبات غير المرئية بوضوح تام عبر التصوير الحراري المتقدم، مما يحمي البيئة ويقلل الفاقد.",
        },
        {
            title: dict.tech.sections.dock,
            image: "/tech_dock.png",
            icon: <Zap className="w-10 h-10 text-accent" />,
            desc: "استقلالية كاملة مع منصات الشحن الذاتي التي تتيح للدرون العمل 24/7 دون الحاجة لتدخل فني ميداني.",
        },
    ];


    return (
        <main className="min-h-screen flex flex-col bg-grey-light">
            <Header lang={lang} dict={dict} />

            {/* Page Header */}
            <section className="py-20 bg-primary text-white text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{dict.tech.title}</h1>
                    <p className="text-xl opacity-80 max-w-2xl mx-auto">
                        مستقبل مراقبة الطاقة اليوم بين يديك. تقنيات ذكية تعمل بتناغم لضمان الأمان والإنتاجية.
                    </p>
                </div>
            </section>

            {/* Payload Systems - Elite UI Update */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">{dict.payloads.title}</h2>
                            <div className="w-24 h-2 bg-accent mx-auto rounded-full" />
                        </div>
                    </FadeIn>

                    <PayloadSelector dict={dict} />
                </div>
            </section>

            {/* Tech Deep Dive */}
            <section className="py-20">
                <div className="container mx-auto px-4 space-y-32">
                    {techFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            <div className="flex-1 w-full box-border">
                                <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02]">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 space-y-6">
                                <div className="inline-block p-4 bg-white rounded-2xl shadow-sm mb-4">
                                    {feature.icon}
                                </div>
                                <h2 className="text-3xl font-bold text-primary">{feature.title}</h2>
                                <p className="text-xl text-grey-dark leading-relaxed">
                                    {feature.desc}
                                </p>
                                <div className="flex items-center gap-3 text-accent font-bold">
                                    <ShieldCheck className="w-6 h-6" />
                                    <span>دقة تصل إلى 99.9% في القراءات</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission Cycle - Elite UI Update */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <MissionCycle dict={dict} />
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto py-12 bg-grey-dark text-white/60 text-center border-t border-white/5">
                <div className="container mx-auto px-4">
                    <p className="mb-4 text-white font-bold text-xl">BasraVision</p>
                    <p>© {new Date().getFullYear()} BasraVision. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
