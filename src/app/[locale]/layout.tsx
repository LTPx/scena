import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/routing";
import { SITE_URL } from "@/app/_services/seo";
import { getContactPage } from "@/app/_services/api";
import "./globals.css";
import App from "./app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  const offices = await getContactPage(locale as "en" | "es" | "de")
    .then((c) => c.offices)
    .catch(() => []);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <App offices={offices}>{children}</App>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
