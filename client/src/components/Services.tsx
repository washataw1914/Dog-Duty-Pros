import { Check } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Dog Duty Services</h2>
          <p className="section-subtitle">
            We offer a variety of pet waste removal services to meet your needs and keep your yard fresh and clean.
          </p>
        </div>

        <div className="mb-12">
          {/* Paw divider */}
          <div className="paw-divider"></div>
          
          {/* Services grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105 duration-300">
              <h3 className="font-bubble text-2xl text-black mb-4 text-center">Regular Yard Service</h3>
              <p className="text-gray-700 mb-6">
                Our most popular option! We'll visit your yard on a regular schedule (weekly or bi-weekly) to keep it consistently clean and odor-free.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="service-check">
                  <Check className="service-check-icon" />
                  <span>Thorough cleaning of your entire yard</span>
                </li>
                <li className="service-check">
                  <Check className="service-check-icon" />
                  <span>Deodorizing service available</span>
                </li>
                <li className="service-check">
                  <Check className="service-check-icon" />
                  <span>Consistent scheduling</span>
                </li>
                <li className="service-check">
                  <Check className="service-check-icon" />
                  <span>Service notification when complete</span>
                </li>
              </ul>
              <div className="text-center">
                <a href="#pricing" className="font-bubble inline-block px-6 py-3 bg-destructive text-white rounded-full hover:bg-red-600 transition duration-200">
                  No Doo-Doo Drama!
                </a>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105 duration-300">
              <h3 className="font-bubble text-2xl text-black mb-4 text-center">One-Time Deep Clean</h3>
              <p className="text-gray-700 mb-6">
                Need a fresh start? Our one-time cleanup service is perfect for yards that haven't been maintained for a while or for special events.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="service-check">
                  <Check className="service-check-icon" />
                  <span>Comprehensive waste removal</span>
                </li>
                <li className="service-check">
                  <Check className="service-check-icon" />
                  <span>Perfect for spring cleaning or events</span>
                </li>
                <li className="service-check">
                  <Check className="service-check-icon" />
                  <span>No contracts or commitments</span>
                </li>
                <li className="service-check">
                  <Check className="service-check-icon" />
                  <span>Same-week scheduling available</span>
                </li>
              </ul>
              <div className="text-center">
                <a href="#pricing" className="font-bubble inline-block px-6 py-3 bg-destructive text-white rounded-full hover:bg-red-600 transition duration-200">
                  Poop Begone!
                </a>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105 duration-300">
              <h3 className="font-bubble text-2xl text-black mb-4 text-center">Commercial Properties</h3>
              <p className="text-gray-700 mb-6">
                We service apartment complexes, dog parks, homeowners associations, and other commercial properties. Keep your spaces clean and enjoyable.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="service-check">
                  <Check className="service-check-icon" />
                  <span>Custom scheduling options</span>
                </li>
                <li className="service-check">
                  <Check className="service-check-icon" />
                  <span>Volume discounts available</span>
                </li>
                <li className="service-check">
                  <Check className="service-check-icon" />
                  <span>Special rates for property managers</span>
                </li>
                <li className="service-check">
                  <Check className="service-check-icon" />
                  <span>Liability insurance coverage</span>
                </li>
              </ul>
              <div className="text-center">
                <a href="#contact" className="font-bubble inline-block px-6 py-3 bg-destructive text-white rounded-full hover:bg-red-600 transition duration-200">
                  Major Duty Calls!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
