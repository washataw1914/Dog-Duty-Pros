import { Check } from "lucide-react";

interface PricingProps {
  onGetStartedClick: () => void;
}

export default function Pricing({ onGetStartedClick }: PricingProps) {
  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle">
            Choose the perfect plan for your yard size and pet count. All packages include our thorough cleanup and disposal service.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 justify-center">
          {/* Basic Plan */}
          <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300 flex-1 max-w-xs">
            <div className="p-4">
              <h3 className="font-bubble text-xl text-black mb-1">Basic Package</h3>
              <p className="text-gray-600 mb-3 text-sm">Perfect for small yards with 1-2 pets</p>
              <div className="flex items-end mb-3">
                <span className="font-bubble text-3xl text-primary">$14.99</span>
                <span className="text-gray-600 ml-2 text-sm">/week</span>
              </div>
              <ul className="space-y-1 mb-4 text-sm">
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-1" size={14} />
                  <span>Weekly service (once per week)</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-1" size={14} />
                  <span>Yards up to 1/4 acre</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-1" size={14} />
                  <span>1-2 pets</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-1" size={14} />
                  <span>Email confirmation</span>
                </li>
              </ul>
              <button 
                onClick={onGetStartedClick}
                className="font-bubble block text-center px-4 py-2 text-sm bg-destructive text-white rounded-full hover:bg-red-600 transition duration-200 w-full"
              >
                Scoop There It Is!
              </button>
            </div>
          </div>

          {/* Popular Plan */}
          <div className="bg-white border-2 border-primary rounded-xl shadow-xl overflow-hidden transform scale-102 relative flex-1 max-w-xs mx-2">
            <div className="absolute top-0 right-0 bg-destructive text-white py-1 px-2 font-bubble text-xs">
              Most Popular
            </div>
            <div className="p-4">
              <h3 className="font-bubble text-xl text-black mb-1">Premium Package</h3>
              <p className="text-gray-600 mb-3 text-sm">Ideal for medium yards with 2-3 pets</p>
              <div className="flex items-end mb-3">
                <span className="font-bubble text-3xl text-primary">$19.99</span>
                <span className="text-gray-600 ml-2 text-sm">/week</span>
              </div>
              <ul className="space-y-1 mb-4 text-sm">
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-1" size={14} />
                  <span>Weekly service (once per week)</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-1" size={14} />
                  <span>Yards up to 1/2 acre</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-1" size={14} />
                  <span>2-3 pets</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-1" size={14} />
                  <span>Text & email confirmations</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-1" size={14} />
                  <span>Deodorizing treatment</span>
                </li>
              </ul>
              <button
                onClick={onGetStartedClick}
                className="font-bubble block text-center px-4 py-2 text-sm bg-destructive text-white rounded-full hover:bg-red-600 transition duration-200 w-full"
              >
                Doo Business With Us!
              </button>
            </div>
          </div>

          {/* Ultimate Plan */}
          <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300 flex-1 max-w-xs">
            <div className="p-4">
              <h3 className="font-bubble text-xl text-black mb-1">Ultimate Package</h3>
              <p className="text-gray-600 mb-3 text-sm">Best for large yards with 4+ pets</p>
              <div className="flex items-end mb-3">
                <span className="font-bubble text-3xl text-primary">$29.99</span>
                <span className="text-gray-600 ml-2 text-sm">/week</span>
              </div>
              <ul className="space-y-1 mb-4 text-sm">
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-1" size={14} />
                  <span>Twice weekly service</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-1" size={14} />
                  <span>Yards up to 1 acre</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-1" size={14} />
                  <span>4+ pets</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-1" size={14} />
                  <span>Text & email confirmations</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-1" size={14} />
                  <span>Deodorizing treatment</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-1" size={14} />
                  <span>Priority scheduling</span>
                </li>
              </ul>
              <button
                onClick={onGetStartedClick}
                className="font-bubble block text-center px-4 py-2 text-sm bg-destructive text-white rounded-full hover:bg-red-600 transition duration-200 w-full"
              >
                Holy Crap, What a Deal!
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 max-w-3xl mx-auto">
          <p className="text-gray-600 mb-6">
            Need a custom solution? We also offer one-time cleanups starting at $49.99. Perfect for special events or to get a fresh start before beginning regular service.
          </p>
          <a href="#contact" className="font-bubble inline-block px-6 py-3 bg-primary text-white rounded-full hover:bg-[#0083D7] transition duration-200">
            Get Your Special Doo-ty Quote!
          </a>
        </div>
      </div>
    </section>
  );
}
