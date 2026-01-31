import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import HUD from "@/components/ui/HUD";

export default function Hero({ dict, imagePath }: { dict: any; imagePath: string }) {
    return (
        <section className="relative h-[90vh] w-full overflow-hidden bg-grey-dark">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={imagePath}
                    alt="BasraVision Drone"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Enhanced Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-grey-dark/90 via-grey-dark/60 to-transparent rtl:bg-gradient-to-l" />
                <div className="absolute inset-0 bg-gradient-to-t from-grey-dark/90 via-transparent to-transparent" />
            </div>

            {/* HUD Overlay */}
            <HUD dict={dict} />

            <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-6 md:px-16 text-white pt-32 md:pt-20">
                <div className="max-w-3xl rtl:mr-0 rtl:ml-auto ltr:mr-auto ltr:ml-0">
                    <FadeIn delay={0.2} direction="up">
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl leading-tight drop-shadow-2xl">
                            {dict.home.hero.title}
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.4} direction="up">
                        <p className="mb-10 text-xl text-grey-light/90 md:text-2xl leading-relaxed drop-shadow-md border-l-4 border-accent pl-6 rtl:border-l-0 rtl:border-r-4 rtl:pr-6">
                            {dict.home.hero.subtitle}
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.6} direction="up">
                        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0 rtl:sm:space-x-reverse">
                            <Link
                                href="/technology"
                                className="group relative overflow-hidden rounded-full bg-accent px-10 py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-accent/40"
                            >
                                <span className="relative z-10">{dict.home.hero.cta}</span>
                                <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform group-hover:translate-x-0 rtl:translate-x-full rtl:group-hover:translate-x-0" />
                            </Link>
                            <Link
                                href="/contact"
                                className="group rounded-full border-2 border-white/30 bg-white/5 px-10 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-primary"
                            >
                                {dict.nav.contact}
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
