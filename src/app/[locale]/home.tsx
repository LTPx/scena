"use client";

import IntroLoader from "../components/IntroLoader";
import Hero from "../components/Hero";
import OurServices from "../components/OurServices";
import Gallery from "../components/Gallery";
import WhereWeMakeDifference from "../components/WhereWeMakeDifference";
import FeaturedProjects from "../components/FeaturedProjects";
import {
  HomePageWp,
  MediaFileWp,
  ProjectListItemWp,
} from "../_interfaces/wordpress-components";
import IntroDescription from "../components/IntroDescription";

interface Props {
  home_information: HomePageWp;
  projects: ProjectListItemWp[];
}

function toMediaFiles(hero: HomePageWp["hero_page"] = []): MediaFileWp[] {
  return hero
    .filter((item) => item?.files?.url)
    .map(({ files }) => ({
      url: files.url,
      type: files.mime_type?.startsWith("video") ? "video" : "image",
    }));
}

function HomePage({ home_information, projects }: Props) {
  const heroPage = toMediaFiles(home_information.hero_page);

  return (
    <div>
      <IntroLoader />
      <Hero heroPage={heroPage} />
      <main className="relative z-10 bg-[#f6f5f1] lg:-mt-[100vh]">
        <IntroDescription
          description={home_information.intro_description.description}
          buttonHref="/projects"
        />
        <OurServices services={home_information.our_services} />
        <IntroDescription
          description={home_information.visit_us_description.description}
          buttonHref="/contact"
          buttonLabel="Visítanos"
          textEndCol={11}
        />
        <Gallery
          gallery={home_information.gallery}
          title="Nuestros showrooms"
        />
        <div
          data-header-theme="light"
          aria-hidden
          className="h-[0px] lg:h-[100px]"
        />
        <WhereWeMakeDifference
          data={home_information.where_we_make_difference}
        />
        <FeaturedProjects projects={projects} />
      </main>
    </div>
  );
}

export default HomePage;
