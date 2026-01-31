import { getDictionary } from "@/dictionaries/dictionaries";
import Header from "@/components/layout/Header";
import Image from "next/image";
import { TrendingUp, Target, BarChart3 } from "lucide-react";

export default async function Market({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="min-h-screen flex flex-col bg-grey-light">
            <Header lang={lang} dict={dict} />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center overflow-hidden">
                <Image
                    src="/basra_sunset.png"
                    alt="Basra Skyline Sunset"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-primary/90 via-primary/40 to-transparent rtl:bg-gradient-to-r" />
                <div className="container relative z-10 mx-auto px-4">
                    <div className="max-w-2xl text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">{dict.market.title}</h1>
                        <p className="text-xl opacity-90 leading-relaxed border-l-4 border-accent pl-6 rtl:border-l-0 rtl:border-r-4 rtl:pr-6">
                            {dict.market.content}
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-10 rounded-[2rem] shadow-sm transform transition-all hover:-translate-y-2">
                            <TrendingUp className="w-12 h-12 text-accent mb-6" />
                            <h3 className="text-2xl font-bold mb-4 text-primary">فرص النمو</h3>
                            <p className="text-grey-dark">يشهد الشرق الأوسط طفرة في الاعتماد على التكنولوجيا الرقمية والذكاء الاصطناعي في قطاع الطاقة.</p>
                            <div className="mt-6 text-4xl font-black text-primary">15%+</div>
                        </div>

                        <div className="bg-white p-10 rounded-[2rem] shadow-sm transform transition-all hover:-translate-y-2">
                            <Target className="w-12 h-12 text-accent mb-6" />
                            <h3 className="text-2xl font-bold mb-4 text-primary">الأهداف المحلية</h3>
                            <p className="text-grey-dark">تغطية شاملة لجميع الآبار والمنشآت في حقول البصرة (الرميلة، غرب القرنة، مجنون).</p>
                            <div className="mt-6 text-4xl font-black text-primary">500+</div>
                        </div>

                        <div className="bg-white p-10 rounded-[2rem] shadow-sm transform transition-all hover:-translate-y-2">
                            <BarChart3 className="w-12 h-12 text-accent mb-6" />
                            <h3 className="text-2xl font-bold mb-4 text-primary">كفاءة الاستثمار</h3>
                            <p className="text-grey-dark">عائد استثماري (ROI) سريع عبر تقليل تكاليف النقل البري وتقليل العطلات والانسكابات.</p>
                            <div className="mt-6 text-4xl font-black text-primary">2.5x</div>
                        </div>
                    </div>

                    {/* Call to action */}
                    <div className="mt-20 bg-primary rounded-[3rem] p-12 text-white text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute top-10 right-10 w-40 h-40 border-4 border-white rotate-45" />
                            <div className="absolute bottom-10 left-10 w-32 h-32 border-4 border-accent rounded-full" />
                        </div>
                        <h2 className="text-3xl font-bold mb-8">كن جزءاً من مستقبل الطاقة في العراق</h2>
                        <button className="bg-accent hover:bg-white hover:text-primary text-white font-bold px-12 py-4 rounded-full transition-all">
                            استشر خبرائنا الأن
                        </button>
                    </div>
                </div>
            </section>

            <footer className="mt-auto py-12 bg-grey-dark text-white/20 text-center">
                <p>© {new Date().getFullYear()} BasraVision. All rights reserved.</p>
            </footer>
        </main>
    );
}
