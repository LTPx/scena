import type { Metadata } from "next";
import { getContactPage, getWordPressCustomPage } from "@/app/_services/api";
import { buildMetadata } from "@/app/_services/seo";
import ContactPage from "@/app/components/Contact-Page";

type Locale = "es" | "de" | "en";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  try {
    const page = await getWordPressCustomPage(locale, "contact");
    return buildMetadata(page.yoast_seo, { locale, path: "/contact" });
  } catch {
    return {};
  }
}

async function Contact({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const data = await getContactPage(locale);

  return (
    <div>
      <ContactPage data={data} />
    </div>
  );
}

export default Contact;
