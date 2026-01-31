import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | BasraVision",
    default: "BasraVision — نظام الطيران الذاتي لمراقبة آبار النفط والغاز",
  },
  description: "BasraVision يقدم حلول درون ذاتية لمراقبة آبار النفط والغاز في البصرة وخارجها. تقليل المخاطر، كشف التسربات، وقراءة العدادات بالذكاء الاصطناعي.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} className={`${cairo.variable} ${inter.variable}`}>
      <body className="font-cairo antialiased">
        {children}
      </body>
    </html>
  );
}
