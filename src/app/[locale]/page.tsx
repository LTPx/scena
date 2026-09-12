"use client";

import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Header from "../components/Header";
import Hero from "../components/Hero";
import IntroLoader from "../components/IntroLoader";
import OurServices from "../components/OurServices";

export default function Home() {
  return (
   <>
      <IntroLoader />
      <Header />
      <Hero />
      <OurServices />
      <Gallery/>
      {/* aquí irán Showrooms y Proyectos destacados cuando los hagamos */}
      <Footer />
    </>
  );
}
