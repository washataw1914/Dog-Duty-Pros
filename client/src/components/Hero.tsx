interface HeroProps {
  onGetQuoteClick: () => void;
}

export default function Hero({ onGetQuoteClick }: HeroProps) {
  return (
    <section id="home" className="pt-24 bg-primary-gradient">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="font-bubble text-4xl md:text-5xl lg:text-6xl text-black leading-tight mb-6">
              <span className="text-primary">Taking A Load Off</span> Your Lawn!
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Your lawn's best friend! We're the poop-scooping superheroes that keep your yard clean, safe, and smell-tacular. Life's too short to pick up poop!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onGetQuoteClick}
                className="cta-button"
              >
                Say Goodbye to Doo-ty!
              </button>
              <a href="#how-it-works" className="secondary-button">
                See How It Works
              </a>
            </div>
            <div className="mt-6 text-gray-600 flex items-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 text-primary" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
              </svg>
              <span>Professional and reliable pet waste removal services</span>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Happy dog with silly expression"
                className="rounded-xl shadow-2xl w-full max-w-lg object-cover border-4 border-white"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-white p-4 rounded-lg font-bubble transform rotate-6 shadow-lg">
                We 💙 Dogs!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
