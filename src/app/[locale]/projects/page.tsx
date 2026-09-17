import ProjectsPage from "@/app/components/Projects-Page";
import { projectsMock } from "../../mocks/projects";

export default function Projects() {
  return <ProjectsPage data={projectsMock} />;
}
