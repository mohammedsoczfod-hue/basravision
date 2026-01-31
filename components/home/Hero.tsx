import Link from "next/link";
import Image from "next/image";

export default function Hero({ dict, imagePath }: { dict: any; imagePath: string }) {
    return (
        <section className="relative h-[90vh] w-full overflow-hidden bg-grey-dark">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={imagePath}
                    alt="BasraVision Drone"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-grey-dark/80" />
            </div>

            <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
                <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
                    {dict.home.hero.title}
                </h1>
                <p className="mb-10 max-w-2xl text-lg text-grey-light/90 md:text-xl">
                    {dict.home.hero.subtitle}
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 rtl:sm:space-x-reverse">
                    <Link
                        href="/technology"
                        className="rounded-full bg-accent px-8 py-3 text-lg font-bold text-white transition-transform hover:scale-105"
                    >
                        {dict.home.hero.cta}
                    </Link>
                    <Link
                        href="/contact"
                        className="rounded-full border-2 border-white px-8 py-3 text-lg font-bold text-white transition-colors hover:bg-white hover:text-primary"
                    >
                        {dict.nav.contact}
                    </Link>
                </div>
            </div>
        </section>
    );
}
