import { getProjectsPage } from "../../_services/api";
import ProjectsPage from "../../components/Projects-Page";

type Locale = "en" | "es" | "de";

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
