"use client";

import FeaturedProjects from "../components/FeaturedProjects";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Header from "../components/Header";
import Hero from "../components/Hero";
import IntroLoader from "../components/IntroLoader";
import OurServices from "../components/OurServices";
import WhereWeMakeDifference from "../components/WhereWeMakeDifference";

export default function Home() {
  return (
    <>
      <IntroLoader />
      {/* <Header /> */}
      <Hero />
      <OurServices />
      <Gallery />
      <WhereWeMakeDifference />
      <FeaturedProjects />
      <Footer />
    </>
  );
}
