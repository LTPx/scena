import type { Metadata } from "next";
import ProjectDetailPage from "@/app/components/Project-Detail-Page";
import { getProjectDetail } from "@/app/_services/api";
import { buildMetadata } from "@/app/_services/seo";
import { notFound } from "next/navigation";

type Locale = "en" | "es" | "de";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const data = await getProjectDetail(locale, slug);
    return buildMetadata(data.yoast_seo, {
      locale,
      path: `/projects/${slug}`,
      fallbackImage: data.hero_image?.url,
      hreflang: false,
    });
  } catch {
    return {};
  }
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  try {
    const data = await getProjectDetail(locale, slug);
    return <ProjectDetailPage data={data} />;
  } catch {
    notFound();
  }
}
