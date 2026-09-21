"use client";

import IntroLoader from "../components/IntroLoader";
import Hero from "../components/Hero";
import OurServices from "../components/OurServices";
import Gallery from "../components/Gallery";
import WhereWeMakeDifference from "../components/WhereWeMakeDifference";
import FeaturedProjects from "../components/FeaturedProjects";
import { HomePageWp } from "../_interfaces/wordpress-components";
import IntroDescription from "../components/IntroDescription";

interface Props {
  home_information: HomePageWp;
}

function HomePage({ home_information }: Props) {
  return (
    <div>
      <IntroLoader />
      <Hero heroPage={home_information.hero_page} />
      <main className="relative z-10 -mt-[100vh] bg-[#f6f5f1]">
        <IntroDescription
          description={home_information.intro_description.description}
          buttonHref="/proyectos"
        />
        <OurServices services={home_information.our_services} />
        <IntroDescription
          description={home_information.visit_us_description.description}
          buttonHref="/contact"
          buttonLabel="Visítanos"
        />
        <Gallery gallery={home_information.gallery} />
        <WhereWeMakeDifference
          data={home_information.where_we_make_difference}
        />
        <FeaturedProjects projects={home_information.projects} />
      </main>
    </div>
  );
}

export default HomePage;
