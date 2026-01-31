import Link from "next/link";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer({ lang, dict }: { lang: string; dict: any }) {
    return (
        <footer className="bg-primary text-white py-20 border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold tracking-tighter">
                            Basra<span className="text-accent">Vision</span>
                        </h3>
                        <p className="opacity-70 leading-relaxed">
                            {dict.footer.desc}
                        </p>
                        <div className="flex space-x-4 rtl:space-x-reverse">
                            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="mailto:info@basravision.com" className="p-2 bg-white/10 rounded-full hover:bg-accent hover:text-white transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold">{dict.footer.links}</h4>
                        <nav className="flex flex-col space-y-3">
                            <Link href={`/${lang}`} className="opacity-70 hover:text-accent transition-colors">{dict.nav.home}</Link>
                            <Link href={`/${lang}/about`} className="opacity-70 hover:text-accent transition-colors">{dict.nav.about}</Link>
                            <Link href={`/${lang}/technology`} className="opacity-70 hover:text-accent transition-colors">{dict.nav.tech}</Link>
                            <Link href={`/${lang}/cases`} className="opacity-70 hover:text-accent transition-colors">{dict.nav.cases}</Link>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold">{dict.footer.contact}</h4>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 rtl:space-x-reverse opacity-70">
                                <Mail className="w-5 h-5 text-accent" />
                                <span>info@basravision.com</span>
                            </div>
                            <div className="flex items-center space-x-3 rtl:space-x-reverse opacity-70">
                                <MapPin className="w-5 h-5 text-accent" />
                                <span>{dict.footer.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter / CTA */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold">{dict.footer.newsletter}</h4>
                        <p className="opacity-70 text-sm">{dict.footer.newsletter_desc}</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder={dict.footer.placeholder}
                                className="bg-white/10 border-none rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-accent"
                            />
                            <button className="bg-accent px-4 py-2 rounded-xl font-bold">
                                {dict.footer.subscribe}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 text-center text-sm opacity-50">
                    <p>© {new Date().getFullYear()} BasraVision. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
