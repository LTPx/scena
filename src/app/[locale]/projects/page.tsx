import type { Metadata } from "next";
import { getProjectsPage } from "../../_services/api";
import { buildMetadata } from "../../_services/seo";
import ProjectsPage from "../../components/Projects-Page";

type Locale = "en" | "es" | "de";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  try {
    const data = await getProjectsPage(locale);
    return buildMetadata(data.yoast_seo, { locale, path: "/projects" });
  } catch {
    return {};
  }
}

export default async function Projects({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ filter?: string }>;
}) {
  const { locale } = await params;
  const { filter } = await searchParams;

  const data = await getProjectsPage(locale);

  return <ProjectsPage data={data} initialFilter={filter} />;
}
