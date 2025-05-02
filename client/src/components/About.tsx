import { Facebook, Instagram, Twitter } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center mb-8">About Dog Duty Pros</h2>
          <p className="text-lg text-gray-700 mb-6">
            Founded by pet lovers for pet lovers, Dog Duty Pros began with a simple mission: help pet parents enjoy their yards without the mess. Since our first service in 2018, we've been dedicated to taking a load off your lawn with exceptional service.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Our team of professional waste removal specialists undergoes thorough training and background checks. We use eco-friendly disposal methods and sanitize our equipment between properties to ensure the health and safety of your pets.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            We're more than just pet waste removal experts - we're committed to making your life easier and your yard more enjoyable. That's the Dog Duty Pros promise!
          </p>
          <div className="flex justify-center space-x-6 mt-8">
            <a href="#" className="text-primary hover:text-[#0083D7] text-2xl">
              <Facebook size={28} />
            </a>
            <a href="#" className="text-primary hover:text-[#0083D7] text-2xl">
              <Instagram size={28} />
            </a>
            <a href="#" className="text-primary hover:text-[#0083D7] text-2xl">
              <Twitter size={28} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
