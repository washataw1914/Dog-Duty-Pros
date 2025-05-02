import { Check } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Scooptastic Services</h2>
          <p className="section-subtitle">
            We offer a variety of pet waste removal services to meet your needs and keep your yard fresh and clean.
          </p>
        </div>

        <div className="space-y-16">
          {/* Service 1 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <img
                src="https://images.unsplash.com/photo-1560743173-567a3b5658b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Regular yard service"
                className="rounded-xl shadow-lg w-full h-80 object-cover"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h3 className="font-bubble text-2xl md:text-3xl text-black mb-4">Regular Yard Service</h3>
              <p className="text-gray-700 mb-6">
                Our most popular option! We'll visit your yard on a regular schedule (weekly or bi-weekly) to keep it consistently clean and odor-free. Perfect for busy pet owners who want to maintain a beautiful yard.
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
                  <span>Consistent scheduling you can count on</span>
                </li>
                <li className="service-check">
                  <Check className="service-check-icon" />
                  <span>Service notification when complete</span>
                </li>
              </ul>
              <a href="#pricing" className="font-bubble inline-block px-6 py-3 bg-destructive text-white rounded-full hover:bg-red-600 transition duration-200">
                Check Our Packages
              </a>
            </div>
          </div>

          {/* Service 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 md:pl-8 mb-8 md:mb-0">
              <img
                src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="One-time cleanup"
                className="rounded-xl shadow-lg w-full h-80 object-cover"
              />
            </div>
            <div className="md:w-1/2 md:pr-8">
              <h3 className="font-bubble text-2xl md:text-3xl text-black mb-4">One-Time Deep Clean</h3>
              <p className="text-gray-700 mb-6">
                Need a fresh start? Our one-time cleanup service is perfect for yards that haven't been maintained for a while or for special events when you want your outdoor space looking its best.
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
              <a href="#pricing" className="font-bubble inline-block px-6 py-3 bg-destructive text-white rounded-full hover:bg-red-600 transition duration-200">
                Book A Deep Clean
              </a>
            </div>
          </div>

          {/* Service 3 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <img
                src="https://images.unsplash.com/photo-1583512603806-077998240c7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Commercial service"
                className="rounded-xl shadow-lg w-full h-80 object-cover"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h3 className="font-bubble text-2xl md:text-3xl text-black mb-4">Commercial Properties</h3>
              <p className="text-gray-700 mb-6">
                We service apartment complexes, dog parks, homeowners associations, and other commercial properties. Keep your community spaces clean and enjoyable for everyone.
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
              <a href="#contact" className="font-bubble inline-block px-6 py-3 bg-destructive text-white rounded-full hover:bg-red-600 transition duration-200">
                Request Commercial Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
