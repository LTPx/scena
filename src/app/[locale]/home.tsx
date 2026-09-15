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
      <section className="pl-[clamp(24px,15vw,280px)] pt-[clamp(100px,13vw,250px)] pb-[clamp(80px,10vw,185px)]">
        <IntroDescription
          description={home_information.intro_description.description}
          buttonHref="/proyectos"
        />
      </section>
      <OurServices services={home_information.our_services} />
      <section className="pl-[clamp(24px,15vw,280px)] py-[clamp(100px,13vw,250px)]">
        <IntroDescription
          description={home_information.visit_us_description.description}
          buttonHref="/contact"
        />
      </section>
      <Gallery gallery={home_information.gallery} />
      <WhereWeMakeDifference data={home_information.where_we_make_difference} />
      <FeaturedProjects projects={home_information.projects} />
    </div>
  );
}

export default HomePage;
