interface HeroProps {
  onGetQuoteClick: () => void;
}

export default function Hero({ onGetQuoteClick }: HeroProps) {
  return (
    <section id="home" className="pt-24 bg-primary-gradient">
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        {/* Call Us button at top right */}
        <div className="absolute top-2 right-4 z-20">
          <a 
            href="tel:+17771234567" 
            className="font-bubble px-4 py-2 text-white rounded-full transition duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            style={{ 
              backgroundColor: "#cc0000", 
              textAlign: "center",
              transform: "translateY(0)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 15px rgba(204, 0, 0, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Call Us!
          </a>
        </div>
        
        <div className="absolute bottom-0 w-full left-0 h-16 overflow-hidden">
          <img src="./images/paw-trail.svg" alt="" className="w-full object-contain" />
        </div>
        
        {/* Centered Business Name */}
        <div className="text-center mb-12 relative">
          <div className="relative mb-8">
            <h1 className="font-bubble text-5xl md:text-6xl lg:text-7xl whitespace-nowrap text-center px-4 mb-6">
              <span className="text-black">Dog Duty Pros</span>
            </h1>
            
            {/* Paw prints walking upward on both sides of the title */}
            <div className="flex justify-center relative" style={{ height: "180px" }}>
              {/* Left side paw prints walking upward */}
              <div className="absolute left-[15%] md:left-[25%] h-full" style={{ width: "80px" }}>
                <div className="paw-print-animated left-paw" style={{ left: '0', bottom: '0%' }}></div>
                <div className="paw-print-animated right-paw" style={{ left: '30px', bottom: '25%' }}></div>
                <div className="paw-print-animated left-paw" style={{ left: '0', bottom: '50%' }}></div>
                <div className="paw-print-animated right-paw" style={{ left: '30px', bottom: '75%' }}></div>
              </div>
              
              {/* Right side paw prints walking upward */}
              <div className="absolute right-[15%] md:right-[25%] h-full" style={{ width: "80px" }}>
                <div className="paw-print-animated left-paw" style={{ left: '0', bottom: '0%' }}></div>
                <div className="paw-print-animated right-paw" style={{ left: '30px', bottom: '25%' }}></div>
                <div className="paw-print-animated left-paw" style={{ left: '0', bottom: '50%' }}></div>
                <div className="paw-print-animated right-paw" style={{ left: '30px', bottom: '75%' }}></div>
              </div>
            </div>
          </div>
          
          <h2 className="font-bubble text-3xl md:text-4xl mb-6 text-white">
            Taking A <span style={{ color: "#F4F00F" }}>Load Off</span> Your Lawn!
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 relative">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover-scale">
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                We handle the dirty work so you don't have to! Professional and reliable pet waste removal services that keep your yard pristine and enjoyable. <span className="font-bold" style={{ color: "#00A3F7" }}>Let us take care of your lawn while you enjoy more time with your pets!</span>
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
                  <svg viewBox="0 0 24 24" className="w-6 h-6 mr-3 flex-shrink-0" style={{ color: "#00A3F7" }} fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                  </svg>
                  <span>Professional & reliable service</span>
                </div>
                <div className="text-gray-700 flex items-center font-medium">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 mr-3 flex-shrink-0" style={{ color: "#00A3F7" }} fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                  </svg>
                  <span>Weekly, bi-weekly & one-time options</span>
                </div>
                <div className="text-gray-700 flex items-center font-medium">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 mr-3 flex-shrink-0" style={{ color: "#00A3F7" }} fill="currentColor">
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
                src="./images/great-pyrenees.svg"
                alt="Happy Great Pyrenees dog in a nice yard"
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
