import { getDictionary } from "@/dictionaries/dictionaries";
import Header from "@/components/layout/Header";
import Image from "next/image";

export default async function CaseStudies({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="min-h-screen flex flex-col bg-white">
            <Header lang={lang} dict={dict} />

            {/* Hero */}
            <section className="relative h-[50vh] flex items-center justify-center">
                <Image
                    src="/case_technicians.png"
                    alt="Technicians in field"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px]" />
                <div className="container relative z-10 mx-auto px-4 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{dict.cases.title}</h1>
                    <div className="h-1.5 w-24 bg-accent mx-auto" />
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid gap-16">
                        {/* BasraVision Local Case */}
                        <div className="bg-grey-light rounded-[2.5rem] p-12 md:p-16 shadow-lg border border-primary/5">
                            <div className="flex flex-col md:flex-row gap-12 items-center">
                                <div className="flex-1 space-y-6">
                                    <span className="inline-block px-4 py-1 bg-accent text-white rounded-full text-sm font-bold tracking-widest uppercase">
                                        Local Impact
                                    </span>
                                    <h2 className="text-3xl font-bold text-primary">المشهد المحلي بالبصرة</h2>
                                    <p className="text-xl text-grey-dark leading-relaxed">
                                        من خلال تطبيق BasraVision في الحقول النفطية العراقية، تمكنا من محاكاة تحسينات هائلة في الكفاءة.
                                    </p>
                                    <p className="text-lg bg-white/80 p-6 rounded-2xl border-r-4 border-accent">
                                        {dict.cases.local}
                                    </p>
                                </div>
                                <div className="flex-1 grid grid-cols-2 gap-4">
                                    <div className="bg-white p-6 rounded-2xl text-center shadow-sm">
                                        <span className="block text-3xl font-bold text-accent">40%</span>
                                        <span className="text-sm text-grey-dark">Cost Saving</span>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl text-center shadow-sm">
                                        <span className="block text-3xl font-bold text-primary">60%</span>
                                        <span className="text-sm text-grey-dark">Time Efficient</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Global Cases */}
                        <div className="space-y-12">
                            <h2 className="text-3xl font-bold text-primary text-center">أهم الشراكات العالمية</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {["BP", "Shell", "ExxonMobil"].map((name) => (
                                    <div key={name} className="group p-10 bg-white border border-grey-light rounded-3xl text-center transition-all hover:bg-primary hover:border-primary shadow-sm hover:shadow-2xl">
                                        <div className="w-16 h-16 bg-grey-light rounded-full mx-auto mb-6 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                            <span className="text-2xl font-bold text-primary group-hover:text-white">
                                                {name.charAt(0)}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-4 group-hover:text-white">{name}</h3>
                                        <p className="text-grey-dark group-hover:text-white/80 text-sm">
                                            تعتمد {name} على تقنيات الدرون الذاتية لتحسين مراقبة خطوط الأنابيب وتقليل الانبعاثات الكربونية.
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-center text-grey-dark italic">
                                {dict.cases.global}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="mt-auto py-12 bg-grey-dark text-white/40 text-center">
                <p>© {new Date().getFullYear()} BasraVision. All rights reserved.</p>
            </footer>
        </main>
    );
}
