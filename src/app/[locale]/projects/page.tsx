import ProjectsPage from "@/app/components/Projects-Page";
import { getProjectsPage } from "@/app/_services/api";

export default async function Projects({
  params,
  searchParams,
}: {
  params: Promise<{ locale: "en" | "es" | "de" }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  const data = await getProjectsPage(locale);
  return <ProjectsPage data={data} initialFilter={category} />;
}
