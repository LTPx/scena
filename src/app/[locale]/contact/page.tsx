import ContactPage from "@/app/components/Contact-Page";
import { contactMock } from "@/app/mocks/contact";

async function Contact({
  params,
}: {
  params: Promise<{ locale: "es" | "de" | "en" }>;
}) {
  const { locale } = await params;

  const data = contactMock;

  return (
    <div>
      <ContactPage data={contactMock} />
    </div>
  );
}

export default Contact;
