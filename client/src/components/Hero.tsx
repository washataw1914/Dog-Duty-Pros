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
              Dog Duty Pros: Taking A Load Off Your Lawn!
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Professional pet waste removal service that keeps your yard clean, safe, and odor-free. Enjoy your outdoor space again without the mess.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onGetQuoteClick}
                className="cta-button"
              >
                Take A Load Off Your Lawn!
              </button>
              <a href="#how-it-works" className="secondary-button">
                See How It Works
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Happy dog in clean yard"
              className="rounded-xl shadow-2xl w-full max-w-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
