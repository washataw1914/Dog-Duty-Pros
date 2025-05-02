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

        <div className="grid grid-cols-2 gap-4 justify-center max-w-xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300 flex-1">
            <div className="p-4">
              <h3 className="font-bubble text-lg text-black mb-1">Basic Package</h3>
              <p className="text-gray-600 mb-2 text-sm">Small yards with 1-2 pets</p>
              <div className="flex items-end mb-2">
                <span className="font-bubble text-2xl text-primary">$14.99</span>
                <span className="text-gray-600 ml-1 text-xs">/week</span>
              </div>
              <ul className="space-y-1 mb-3 text-sm">
                <li className="flex items-start">
                  <Check className="text-primary mt-0.5 mr-1" size={12} />
                  <span>Weekly service</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-0.5 mr-1" size={12} />
                  <span>Yards up to 1/4 acre</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-0.5 mr-1" size={12} />
                  <span>1-2 pets</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-0.5 mr-1" size={12} />
                  <span>Email confirmation</span>
                </li>
              </ul>
              <button 
                onClick={onGetStartedClick}
                className="font-bubble block text-center px-3 py-1.5 text-sm bg-destructive text-white rounded-full hover:bg-red-600 transition duration-200 w-full"
              >
                Scoop There It Is!
              </button>
            </div>
          </div>

          {/* Popular Plan */}
          <div className="bg-white border-2 border-primary rounded-xl shadow-xl overflow-hidden relative flex-1">
            <div className="absolute top-0 right-0 bg-destructive text-white py-0.5 px-2 font-bubble text-xs">
              Most Popular
            </div>
            <div className="p-4">
              <h3 className="font-bubble text-lg text-black mb-1">Premium Package</h3>
              <p className="text-gray-600 mb-2 text-sm">Medium yards with 2-3 pets</p>
              <div className="flex items-end mb-2">
                <span className="font-bubble text-2xl text-primary">$19.99</span>
                <span className="text-gray-600 ml-1 text-xs">/week</span>
              </div>
              <ul className="space-y-1 mb-3 text-sm">
                <li className="flex items-start">
                  <Check className="text-primary mt-0.5 mr-1" size={12} />
                  <span>Weekly service</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-0.5 mr-1" size={12} />
                  <span>Yards up to 1/2 acre</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-0.5 mr-1" size={12} />
                  <span>2-3 pets</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-0.5 mr-1" size={12} />
                  <span>Text & email confirmations</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-0.5 mr-1" size={12} />
                  <span>Deodorizing treatment</span>
                </li>
              </ul>
              <button
                onClick={onGetStartedClick}
                className="font-bubble block text-center px-3 py-1.5 text-sm bg-destructive text-white rounded-full hover:bg-red-600 transition duration-200 w-full"
              >
                Doo Business With Us!
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
