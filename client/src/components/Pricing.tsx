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

        <div className="grid md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300">
            <div className="p-8">
              <h3 className="font-bubble text-2xl text-black mb-2">Basic Package</h3>
              <p className="text-gray-600 mb-6">Perfect for small yards with 1-2 pets</p>
              <div className="flex items-end mb-6">
                <span className="font-bubble text-4xl text-primary">$14.99</span>
                <span className="text-gray-600 ml-2">/week</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2" size={18} />
                  <span>Weekly service (once per week)</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2" size={18} />
                  <span>Yards up to 1/4 acre</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2" size={18} />
                  <span>1-2 pets</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2" size={18} />
                  <span>Email confirmation</span>
                </li>
              </ul>
              <button 
                onClick={onGetStartedClick}
                className="font-bubble block text-center px-6 py-3 bg-destructive text-white rounded-full hover:bg-red-600 transition duration-200 w-full"
              >
                Scoop Away The Poo!
              </button>
            </div>
          </div>

          {/* Popular Plan */}
          <div className="bg-white border-2 border-primary rounded-xl shadow-xl overflow-hidden transform scale-105 relative">
            <div className="absolute top-0 right-0 bg-destructive text-white py-1 px-4 font-bubble text-sm">
              Most Popular
            </div>
            <div className="p-8">
              <h3 className="font-bubble text-2xl text-black mb-2">Premium Package</h3>
              <p className="text-gray-600 mb-6">Ideal for medium yards with 2-3 pets</p>
              <div className="flex items-end mb-6">
                <span className="font-bubble text-4xl text-primary">$19.99</span>
                <span className="text-gray-600 ml-2">/week</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2" size={18} />
                  <span>Weekly service (once per week)</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2" size={18} />
                  <span>Yards up to 1/2 acre</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2" size={18} />
                  <span>2-3 pets</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2" size={18} />
                  <span>Text & email confirmations</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2" size={18} />
                  <span>Deodorizing treatment</span>
                </li>
              </ul>
              <button
                onClick={onGetStartedClick}
                className="font-bubble block text-center px-6 py-3 bg-destructive text-white rounded-full hover:bg-red-600 transition duration-200 w-full"
              >
                Claim Your Clean Yard!
              </button>
            </div>
          </div>

          {/* Ultimate Plan */}
          <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300">
            <div className="p-8">
              <h3 className="font-bubble text-2xl text-black mb-2">Ultimate Package</h3>
              <p className="text-gray-600 mb-6">Best for large yards with 4+ pets</p>
              <div className="flex items-end mb-6">
                <span className="font-bubble text-4xl text-primary">$29.99</span>
                <span className="text-gray-600 ml-2">/week</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2" size={18} />
                  <span>Twice weekly service</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2" size={18} />
                  <span>Yards up to 1 acre</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2" size={18} />
                  <span>4+ pets</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2" size={18} />
                  <span>Text & email confirmations</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2" size={18} />
                  <span>Deodorizing treatment</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2" size={18} />
                  <span>Priority scheduling</span>
                </li>
              </ul>
              <button
                onClick={onGetStartedClick}
                className="font-bubble block text-center px-6 py-3 bg-destructive text-white rounded-full hover:bg-red-600 transition duration-200 w-full"
              >
                Maximum Poo Removal!
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 max-w-3xl mx-auto">
          <p className="text-gray-600 mb-6">
            Need a custom solution? We also offer one-time cleanups starting at $49.99. Perfect for special events or to get a fresh start before beginning regular service.
          </p>
          <a href="#contact" className="font-bubble inline-block px-6 py-3 bg-primary text-white rounded-full hover:bg-blue-700 transition duration-200">
            Get a Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}
