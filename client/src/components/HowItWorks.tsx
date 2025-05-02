import { CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            From "Oops!" to "Ahhh!" in three simple steps! Our poop patrol makes yard cleanup as easy as watching your dog do their business.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center relative">
            <img
              src="./images/logo for vector dog dutyyellow.png"
              alt="Dog Duty Logo"
              className="w-20 h-20 mx-auto rounded-full object-cover border-4 mb-4"
              style={{ borderColor: "#00A3F7" }}
            />
            
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center mb-2">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">1</div>
                  <h3 className="font-bubble text-xl text-black">Book Online</h3>
                </div>
                <p className="text-gray-700">
                  Click a few buttons and poof! Your poop problems are scheduled to disappear. <span className="accent-yellow-text">No more stepping in "surprises!"</span>
                </p>
              </div>

              {/* Step 2 */}
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center mb-2">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">2</div>
                  <h3 className="font-bubble text-xl text-black">We Take The Load Off</h3>
                </div>
                <p className="text-gray-700">
                  Our elite poop commandos deploy to your yard with military precision. <span className="accent-yellow-text">We leave no turd behind!</span>
                </p>
              </div>

              {/* Step 3 */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">3</div>
                  <h3 className="font-bubble text-xl text-black">Enjoy Your Clean Yard</h3>
                </div>
                <p className="text-gray-700">
                  <span className="accent-yellow-text">Go barefoot again!</span> Your yard is now a poop-free paradise. Your nose and shoes will thank you profusely.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/schedule" className="cta-button inline-block">
            Let Us Handle Your Doo-ties!
          </Link>
        </div>
      </div>
    </section>
  );
}
