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

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center relative">
            <h3 className="font-bubble text-2xl text-black mb-4">Book Online</h3>
            <p className="text-gray-700 mb-4">
              Click a few buttons and poof! Your poop problems are scheduled to disappear. <span className="accent-yellow-text">No more stepping in "surprises!"</span>
            </p>
            <img
              src="./images/logo for vector dog dutyyellow.png"
              alt="Funny dog with tongue out"
              className="w-20 h-20 mx-auto rounded-full object-cover border-4"
              style={{ borderColor: "#00A3F7" }}
            />
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center relative">
            <h3 className="font-bubble text-2xl text-black mb-4">We Take The Load Off</h3>
            <p className="text-gray-700 mb-4">
              Our elite poop commandos deploy to your yard with military precision. <span className="accent-yellow-text">We leave no turd behind!</span>
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center relative">
            <h3 className="font-bubble text-2xl text-black mb-4">Enjoy Your Clean Yard</h3>
            <p className="text-gray-700 mb-4">
              <span className="accent-yellow-text">Go barefoot again!</span> Your yard is now a poop-free paradise. Your nose and shoes will thank you profusely.
            </p>
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
