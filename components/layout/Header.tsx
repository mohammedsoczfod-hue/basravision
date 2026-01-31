"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header({ lang, dict }: { lang: string; dict: any }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleLang = () => {
        const newLang = lang === "ar" ? "en" : "ar";
        return pathname.replace(`/${lang}`, `/${newLang}`);
    };

    const navItems = [
        { name: dict.nav.home, href: `/${lang}` },
        { name: dict.nav.about, href: `/${lang}/about` },
        { name: dict.nav.tech, href: `/${lang}/technology` },
        { name: dict.nav.cases, href: `/${lang}/cases` },
        { name: dict.nav.contact, href: `/${lang}/contact` },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href={`/${lang}`} className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-2xl font-bold tracking-tighter text-primary">
                        Basra<span className="text-accent">Vision</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex md:items-center md:space-x-8 rtl:space-x-reverse">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href={toggleLang()}
                        className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary rtl:space-x-reverse"
                    >
                        <Globe className="h-4 w-4" />
                        <span>{lang === "ar" ? "English" : "العربية"}</span>
                    </Link>
                </nav>

                {/* Mobile menu button */}
                <div className="flex items-center space-x-4 md:hidden rtl:space-x-reverse">
                    <Link href={toggleLang()} className="p-2">
                        <Globe className="h-5 w-5" />
                    </Link>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="border-b bg-background md:hidden">
                    <nav className="flex flex-col space-y-4 p-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
