import AboutPage from "@/app/components/About-Page";
import { aboutMock } from "../../mocks/about";

export default function About() {
  return <AboutPage data={aboutMock} />;
}
