import { CheckCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Getting a cleaner yard is as easy as 1, 2, 3! Our simple process makes it effortless to enjoy a poop-free yard.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center relative">
            <div className="step-number">1</div>
            <h3 className="font-bubble text-2xl text-black mb-4">Book Online</h3>
            <p className="text-gray-700 mb-4">
              Schedule your service online in minutes. Choose from weekly, bi-weekly, or one-time cleanings.
            </p>
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
              alt="Person booking service on phone"
              className="w-16 h-16 mx-auto rounded-full object-cover"
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
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
              alt="Dog running in clean yard"
              className="w-16 h-16 mx-auto rounded-full object-cover"
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
              src="https://images.unsplash.com/photo-1564732795220-08ffd59e2c7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
              alt="Family enjoying backyard"
              className="w-16 h-16 mx-auto rounded-full object-cover"
            />
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="#get-started" className="cta-button inline-block">
            Take A Load Off Your Lawn Now!
          </a>
        </div>
      </div>
    </section>
  );
}
