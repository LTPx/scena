import { getContactPage } from "@/app/_services/api";
import ContactPage from "@/app/components/Contact-Page";

async function Contact({
  params,
}: {
  params: Promise<{ locale: "es" | "de" | "en" }>;
}) {
  const { locale } = await params;

  const data = await getContactPage(locale);

  return (
    <div>
      <ContactPage data={data} />
    </div>
  );
}

export default Contact;
