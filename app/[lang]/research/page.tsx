import { getDictionary } from "@/dictionaries/dictionaries";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileText, Download, Building2, Calendar } from "lucide-react";

export default async function Research({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const papers = [
        { title: "معالجة الصور الرقمية لكشف التسربات النفطية", org: "جامعة البصرة", date: "2024" },
        { title: "تحليل ROI لأنظمة الطيران الذاتي في الشرق الأوسط", org: "مركز أبحاث الطاقة", date: "2023" },
        { title: "تحسين خوارزميات OCR للعدادات الميكانيكية", org: "مختبرات الذكاء الاصطناعي", date: "2024" },
        { title: "تقييم الأداء البيئي للدرون في الحقول العملاقة", org: "المعهد الهندسي العراقي", date: "2022" },
        { title: "مستقبل الاتصالات اللاسلكية في المواقع النفطية", org: "جامعة بغداد", date: "2024" },
    ];

    return (
        <main className="min-h-screen flex flex-col bg-grey-light">
            <Header lang={lang} dict={dict} />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">{dict.research.title}</h1>
                        <p className="text-xl text-grey-dark max-w-3xl leading-relaxed">
                            {dict.research.highlight} تلتزم BasraVision بتطوير البحث العلمي لدعم قطاع الطاقة العراقي بحلول محلية مبتكرة.
                        </p>
                    </div>

                    <div className="grid gap-6">
                        {papers.map((paper, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-center gap-8 border border-white hover:border-accent group">
                                <div className="flex items-start gap-6">
                                    <div className="p-4 bg-primary/5 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <FileText className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-primary leading-tight">{paper.title}</h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-grey-dark/60 font-medium font-inter">
                                            <div className="flex items-center gap-1">
                                                <Building2 className="w-4 h-4" />
                                                <span>{paper.org}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{paper.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 bg-grey-light hover:bg-accent hover:text-white px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap">
                                    <Download className="w-5 h-5" />
                                    <span>تحميل PDF</span>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 p-12 bg-grey-dark text-white rounded-[3rem] text-center space-y-6">
                        <h2 className="text-2xl font-bold">هل لديك بحث في هذا المجال؟</h2>
                        <p className="opacity-70 max-w-xl mx-auto">
                            نحن نرحب بالتعاون الأكاديمي مع الباحثين والجامعات لتطوير تقنيات مراقبة الآبار والذكاء الاصطناعي الرمزي.
                        </p>
                        <button className="text-accent font-bold hover:underline">ارسل لنا مقترحك البحثي</button>
                    </div>
                </div>
            </section>

            <Footer lang={lang} dict={dict} />
        </main>
    );
}
