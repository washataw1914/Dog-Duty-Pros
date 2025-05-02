import { CheckCircle } from "lucide-react";

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
            <div className="step-number">1</div>
            <h3 className="font-bubble text-2xl text-black mb-4">Book Online</h3>
            <p className="text-gray-700 mb-4">
              Click a few buttons and poof! Your poop problems are scheduled to disappear. No more stepping in "surprises!"
            </p>
            <img
              src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
              alt="Funny dog with tongue out"
              className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-primary"
            />
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center relative">
            <div className="step-number">2</div>
            <h3 className="font-bubble text-2xl text-black mb-4">We Take The Load Off</h3>
            <p className="text-gray-700 mb-4">
              Our Dog Duty Pros will visit your yard and remove all pet waste thoroughly.
            </p>
            <img
              src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
              alt="Dog with funny smiling face"
              className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-primary"
            />
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center relative">
            <div className="step-number">3</div>
            <h3 className="font-bubble text-2xl text-black mb-4">Enjoy Your Clean Yard</h3>
            <p className="text-gray-700 mb-4">
              Relax and enjoy your clean, odor-free yard! We'll send you a notification when service is complete.
            </p>
            <img
              src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
              alt="Dog jumping in celebration"
              className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-primary"
            />
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="#get-started" className="cta-button inline-block">
            Let Us Handle Your Doo-ties!
          </a>
        </div>
      </div>
    </section>
  );
}
