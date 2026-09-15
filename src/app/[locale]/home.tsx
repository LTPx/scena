"use client";

import IntroLoader from "../components/IntroLoader";
import Hero from "../components/Hero";
import OurServices from "../components/OurServices";
import Gallery from "../components/Gallery";
import WhereWeMakeDifference from "../components/WhereWeMakeDifference";
import FeaturedProjects from "../components/FeaturedProjects";
import { HomePageWp } from "../_interfaces/wordpress-components";

interface Props {
  home_information: HomePageWp;
}

function HomePage({ home_information }: Props) {
  return (
    <div>
      <IntroLoader />
      <Hero heroPage={home_information.hero_page} />
      <OurServices services={home_information.our_services} />
      <Gallery gallery={home_information.gallery} />
      <WhereWeMakeDifference data={home_information.where_we_make_difference} />
      <FeaturedProjects projects={home_information.projects} />{" "}
    </div>
  );
}

export default HomePage;
