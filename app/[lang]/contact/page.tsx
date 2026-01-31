import { getDictionary } from "@/dictionaries/dictionaries";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default async function Contact({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="min-h-screen flex flex-col bg-grey-light">
            <Header lang={lang} dict={dict} />

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto pt-10">
                        {/* Contact Info */}
                        <div className="space-y-12">
                            <div className="space-y-6 text-right rtl:text-right ltr:text-left">
                                <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight">
                                    {dict.contact.title}
                                </h1>
                                <p className="text-xl text-grey-dark opacity-70">
                                    فريقنا مستعد دائماً للإجابة على استفساراتكم التقنية والاستثمارية.
                                </p>
                            </div>

                            <div className="grid gap-8">
                                <div className="flex items-center gap-6 p-8 bg-white rounded-[2rem] shadow-sm">
                                    <div className="p-4 bg-primary/5 rounded-2xl text-primary">
                                        <Mail className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-grey-dark/50">البريد الإلكتروني</p>
                                        <p className="text-xl font-bold text-primary">info@basravision.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 p-8 bg-white rounded-[2rem] shadow-sm">
                                    <div className="p-4 bg-primary/5 rounded-2xl text-primary">
                                        <MapPin className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-grey-dark/50">المقر الرئيسي</p>
                                        <p className="text-xl font-bold text-primary">البصرة، العراق</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-2 bg-accent rounded-full" />

                            <form className="space-y-6 text-right rtl:text-right ltr:text-left">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-grey-dark/60 ml-2">{dict.contact.form.name}</label>
                                    <input type="text" className="w-full p-5 bg-grey-light rounded-2xl border-none focus:ring-2 focus:ring-accent transition-all" placeholder="الاسم الكامل" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-grey-dark/60 ml-2">{dict.contact.form.email}</label>
                                    <input type="email" className="w-full p-5 bg-grey-light rounded-2xl border-none focus:ring-2 focus:ring-accent transition-all" placeholder="example@domain.com" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-grey-dark/60 ml-2">{dict.contact.form.company}</label>
                                    <input type="text" className="w-full p-5 bg-grey-light rounded-2xl border-none focus:ring-2 focus:ring-accent transition-all" placeholder="اسم الشركة / المؤسسة" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-grey-dark/60 ml-2">{dict.contact.form.message}</label>
                                    <textarea rows={4} className="w-full p-5 bg-grey-light rounded-2xl border-none focus:ring-2 focus:ring-accent transition-all" placeholder="كيف يمكننا مساعدتك؟"></textarea>
                                </div>

                                <button type="button" className="w-full py-5 bg-primary text-white font-bold rounded-2xl hover:bg-accent shadow-xl hover:shadow-accent/20 transition-all flex items-center justify-center gap-3 group">
                                    <Send className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                                    <span>{dict.contact.form.submit}</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer lang={lang} dict={dict} />
        </main>
    );
}
