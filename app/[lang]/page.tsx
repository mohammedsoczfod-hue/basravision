import { getDictionary } from "@/dictionaries/dictionaries";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Link from "next/link";
import Image from "next/image";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Header lang={lang} dict={dict} />

      <Hero dict={dict} imagePath="/hero_drone.png" />

      <Features dict={dict} />

      {/* Secondary Hero / Market Preview */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                {dict.market.title}
              </h2>
              <p className="text-xl text-grey-dark leading-relaxed opacity-80">
                {dict.market.content}
              </p>
              <Link
                href={`/${lang}/market`}
                className="inline-block text-accent font-bold text-lg hover:translate-x-2 transition-transform rtl:hover:-translate-x-2"
              >
                اطلع على كافة المؤشرات →
              </Link>
            </div>
            <div className="flex-1 w-full">
              <div className="relative h-[400px] w-full rounded-[3rem] overflow-hidden shadow-2xl group">
                <Image
                  src="/basra_sunset.png"
                  alt="Basra Skyline"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white rotate-12" />
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white -rotate-12" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">جاهز لبدء التحول الرقمي؟</h2>
          <p className="mb-12 text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            تواصل معنا اليوم لمعرفة كيف يمكن لـ BasraVision تحسين كفاءة عملياتك الميدانية في حقول البصرة.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`/${lang}/contact`}
              className="bg-accent text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform"
            >
              {dict.nav.contact}
            </Link>
            <Link
              href={`/${lang}/technology`}
              className="bg-white/10 text-white px-12 py-4 rounded-full font-bold text-lg border border-white/20 hover:bg-white/20 transition-all"
            >
              شرح التقنية
            </Link>
          </div>
        </div>
      </section>

      <Footer lang={lang} dict={dict} />
    </main>
  );
}
