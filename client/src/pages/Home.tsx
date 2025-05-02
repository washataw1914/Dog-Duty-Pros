import { useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import CallToAction from "@/components/CallToAction";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  const servicesRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const getQuoteRef = useRef<HTMLDivElement>(null);
  
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onServicesClick={() => scrollToSection(servicesRef)}
        onPricingClick={() => scrollToSection(pricingRef)}
        onAboutClick={() => scrollToSection(aboutRef)}
        onContactClick={() => scrollToSection(contactRef)}
        onGetStartedClick={() => scrollToSection(getQuoteRef)}
      />
      <main className="flex-grow">
        <Hero onGetQuoteClick={() => scrollToSection(getQuoteRef)} />
        <Stats />
        <HowItWorks />
        <div ref={servicesRef}>
          <Services />
        </div>
        <Testimonials />
        <div ref={pricingRef}>
          <Pricing onGetStartedClick={() => scrollToSection(getQuoteRef)} />
        </div>
        <div ref={aboutRef}>
          <About />
        </div>
        <FAQ />
        <CallToAction onGetStartedClick={() => scrollToSection(getQuoteRef)} />
        <div ref={contactRef}>
          <div ref={getQuoteRef}>
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer 
        onServicesClick={() => scrollToSection(servicesRef)}
        onPricingClick={() => scrollToSection(pricingRef)}
        onAboutClick={() => scrollToSection(aboutRef)}
        onContactClick={() => scrollToSection(contactRef)}
      />
    </div>
  );
}
