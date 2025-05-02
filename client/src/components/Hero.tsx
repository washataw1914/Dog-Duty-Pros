interface HeroProps {
  onGetQuoteClick: () => void;
}

export default function Hero({ onGetQuoteClick }: HeroProps) {
  return (
    <section id="home" className="pt-24 bg-primary-gradient">
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        {/* Centered Business Name */}
        <div className="text-center mb-12 relative">
          <h1 className="font-bubble text-5xl md:text-6xl lg:text-7xl text-black leading-tight mb-4">
            Dog Duty Pros
          </h1>
          <h2 className="font-bubble text-3xl md:text-4xl text-bright-blue mb-6">
            Taking A Load Off Your Lawn!
          </h2>
          
          <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md">
            <p className="text-xl text-center font-medium text-gray-700">
              🐾 We scoop the poop, so you don't have to! 🐾
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 relative">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover-scale">
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Your lawn's best friend! We're the poop-scooping superheroes that keep your yard clean, safe, and smell-tacular. <span className="font-bold text-primary">Life's too short to pick up poop!</span>
              </p>
              <div className="flex justify-center mb-8">
                <button
                  onClick={onGetQuoteClick}
                  className="cta-button"
                >
                  Doo Business With Us
                </button>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="text-gray-700 flex items-center font-medium">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 mr-3 text-primary flex-shrink-0" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                  </svg>
                  <span>Professional & reliable service</span>
                </div>
                <div className="text-gray-700 flex items-center font-medium">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 mr-3 text-primary flex-shrink-0" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                  </svg>
                  <span>Weekly, bi-weekly & one-time options</span>
                </div>
                <div className="text-gray-700 flex items-center font-medium">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 mr-3 text-primary flex-shrink-0" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                  </svg>
                  <span>No contracts, cancel anytime!</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1546421845-6471bdcf3edf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Playful dog enjoying the lawn"
                className="rounded-xl shadow-2xl w-full max-w-lg object-cover border-8 border-white hover-scale"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-xl font-bubble transform rotate-6 shadow-lg text-lg">
                We 💙 Dogs!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
