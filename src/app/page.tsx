"use client";

import { useEffect, useRef } from "react";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PricingSection from "@/components/sections/PricingSection";

export default function HomePage() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);

  useEffect(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create the fade transition between Hero and Services sections
    gsap.fromTo(
      heroRef.current,
      { opacity: 1 },
      {
        opacity: 0,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        }
      }
    );

    // Animate the Services section entrance
    gsap.fromTo(
      servicesRef.current,
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        }
      }
    );

    // Clean up animations on component unmount
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ScrollTrigger.getAll().forEach((trigger: { kill: () => any; }) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div id="inicio" ref={heroRef}>
        <HeroSection />
      </div>
      <div id="servicios" ref={servicesRef}>
        <ServicesSection />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="proyectos">
        <ProjectsSection />
      </div>
      <div id="blog">
        <BlogSection />
      </div>
      <div id="contacto">
        <ContactSection />
      </div>
    </>
  );
}