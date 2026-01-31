import { getDictionary } from "@/dictionaries/dictionaries";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { History, Eye, Rocket, Award } from "lucide-react";

export default async function About({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="min-h-screen flex flex-col">
            <Header lang={lang} dict={dict} />

            {/* Hero */}
            <section className="relative py-32 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image src="/basra_sunset.png" alt="Basra" fill className="object-cover" />
                </div>
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">{dict.about.title}</h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
                        شركة نفط البصرة هي القلب النابض للطاقة في العراق، و BasraVision هي رؤيتنا التكنولوجية لهذا القلب.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex flex-col gap-16">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1 space-y-6">
                                <div className="flex items-center gap-4 text-accent">
                                    <History className="w-8 h-8" />
                                    <h2 className="text-2xl font-bold">بداية الرحلة</h2>
                                </div>
                                <p className="text-xl text-grey-dark leading-relaxed">
                                    {dict.about.story}
                                </p>
                            </div>
                            <div className="flex-1 bg-grey-light p-10 rounded-[2.5rem] relative">
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent rounded-full" />
                                <p className="text-primary font-bold italic text-lg leading-relaxed relative z-10">
                                    "نحن لا نوفر فقط صوراً من السماء، بل نوفر رؤية ذكية تحمي الأرواح والبيئة."
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-10 bg-grey-light rounded-[3rem] space-y-4">
                                <Eye className="w-12 h-12 text-primary" />
                                <h3 className="text-2xl font-bold text-primary">رؤيتنا</h3>
                                <p className="text-grey-dark text-lg leading-relaxed">{dict.about.vision}</p>
                            </div>
                            <div className="p-10 bg-grey-dark text-white rounded-[3rem] space-y-4">
                                <Rocket className="w-12 h-12 text-accent" />
                                <h3 className="text-2xl font-bold">رسالتنا</h3>
                                <p className="opacity-80 text-lg leading-relaxed">{dict.about.mission}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-grey-light">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-16 text-primary">{dict.about.values.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {dict.about.values.items.map((value: string, i: number) => (
                            <div key={i} className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-shadow group">
                                <div className="w-16 h-16 bg-primary/5 rounded-2xl mx-auto mb-6 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                                    <Award className="w-8 h-8" />
                                </div>
                                <span className="text-xl font-bold text-grey-dark">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer lang={lang} dict={dict} />
        </main>
    );
}
