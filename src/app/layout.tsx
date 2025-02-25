import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className="min-h-screen w-screen bg-background"
      suppressHydrationWarning
    >
      <body
        className={`${oswald.variable} antialiased max-w-[100vw] overflow-x-hidden py-10 lg:py-20`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale(); // Get active locale

  const metadataTranslations = {
    en: {
      title: "Your life in weeks",
      description: "Visualize your life calendar in weeks, months or years.",
    },
    es: {
      title: "Tu vida en semanas",
      description: "Mira tu calendario de vida en semanas, meses o años.",
    },
  };

  return metadataTranslations[locale] || metadataTranslations.en;
}
