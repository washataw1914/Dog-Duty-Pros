import { CheckCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            From "Oops!" to "Ahhh!" with just a click! We make it easy to keep your yard clean and tidy.
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
                  <h3 className="font-bubble text-xl text-black">Schedule Today</h3>
                </div>
                <p className="text-gray-700">
                  Click a few buttons and poof! Your dooty disaster is scheduled to disappear. <span className="accent-yellow-text">No more stepping in "surprises!"</span>
                </p>
              </div>

              {/* Step 2 */}
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center mb-2">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">2</div>
                  <h3 className="font-bubble text-xl text-black">We Take The Load Off</h3>
                </div>
                <p className="text-gray-700">
                  We promptly and efficiently clean up and thoroughly sanitize between clients. We send a text when finished of a picture of your locked gate ensuring that you know your furry friends are safely inside. <span className="accent-yellow-text">No duty left undone!</span>
                </p>
              </div>

              {/* Step 3 */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">3</div>
                  <h3 className="font-bubble text-xl text-black">Enjoy Your Clean Yard</h3>
                </div>
                <p className="text-gray-700">
                  <span className="accent-yellow-text">Go barefoot again!</span> Enjoy a sigh of relief knowing your yard is dooty free and we'll be back soon to keep it that way.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="cta-button inline-block">
            Let Us Handle Your Doo-ties!
          </a>
        </div>
      </div>
    </section>
  );
}
