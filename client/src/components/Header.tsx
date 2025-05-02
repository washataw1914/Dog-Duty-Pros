import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

interface HeaderProps {
  onServicesClick: () => void;
  onPricingClick: () => void;
  onAboutClick: () => void;
  onContactClick: () => void;
  onGetStartedClick: () => void;
}

export default function Header({
  onServicesClick,
  onPricingClick,
  onAboutClick,
  onContactClick,
  onGetStartedClick
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (callback: () => void) => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    callback();
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Top Bar with Logo and Hamburger Menu */}
        <div className="flex justify-between items-center">
          {/* Logo - positioned in the upper left corner */}
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="./images/logo for vector dog dutyyellow.png" 
                alt="Dog Duty Pros Logo"
                className="h-16 w-auto"
              />
            </Link>
          </div>

          {/* Mobile Menu Button - moved to upper right corner */}
          <button
            onClick={toggleMobileMenu}
            className="text-primary focus:outline-none p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation - centered below logo on larger screens, hidden on mobile */}
        <nav className="hidden md:flex justify-center items-center mt-2 space-x-1">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200 px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            Home
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onServicesClick);
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200 px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            Services
          </a>
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onPricingClick);
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200 px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            Pricing
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onAboutClick);
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200 px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onContactClick);
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200 px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            Contact
          </a>

        </nav>
      </div>

      {/* Mobile Navigation - dropdown menu */}
      <div
        className={`md:hidden absolute top-[100%] left-0 right-0 bg-white px-4 py-3 shadow-lg transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        style={{ 
          visibility: mobileMenuOpen ? 'visible' : 'hidden',
          transitionProperty: 'opacity, transform, visibility',
          transitionDelay: mobileMenuOpen ? '0s' : '0s, 0s, 300ms'
        }}
      >
        <div className="flex flex-col divide-y divide-gray-100">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200 py-3 px-2 flex items-center"
          >
            <span className="text-primary mr-3">•</span>
            Home
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onServicesClick);
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200 py-3 px-2 flex items-center"
          >
            <span className="text-primary mr-3">•</span>
            Services
          </a>
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onPricingClick);
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200 py-3 px-2 flex items-center"
          >
            <span className="text-primary mr-3">•</span>
            Pricing
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onAboutClick);
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200 py-3 px-2 flex items-center"
          >
            <span className="text-primary mr-3">•</span>
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onContactClick);
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200 py-3 px-2 flex items-center"
          >
            <span className="text-primary mr-3">•</span>
            Contact
          </a>

        </div>
      </div>
    </header>
  );
}
