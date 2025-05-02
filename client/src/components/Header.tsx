import { useState } from "react";
import { Menu, X } from "lucide-react";

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
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <svg 
              className="h-14 w-14 text-primary"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"/>
              <path d="M66 38c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zM34 38c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"/>
              <path d="M70 60H30c-1.1 0-2 .9-2 2 0 11 9.8 20 22 20s22-9 22-20c0-1.1-.9-2-2-2zm-22 14c-5.5 0-10-4.5-10-10h20c0 5.5-4.5 10-10 10z"/>
              <path d="M87 32c-2.5-4-8-4-10.5 0-2-2.5-6-3-8.5-.5-3.5-3-7.5-1-9.5 1.5-3-3-8-3-11 0-2-2.5-6-4.5-9.5-1.5-2.5-2.5-6.5-2-8.5.5-2.5-4-8-4-10.5 0-1.5-.5-3.5-1-4.5 2-1-2.5-1-6.5 1-8.5 0-3.5 3-5 6-5.5 0-4 4-6 8-4.5 1-5 7-5.5 9-1.5 3-3 8-3 11 0 2-4 8-3.5 9 1.5 4-1.5 8 .5 8 4.5 3 .5 6 2 6 5.5 2 3 3 8.5 1 8.5-1 3 0 4.5-1.5 5.5z"/>
            </svg>
            <span className="font-bubble text-xl md:text-2xl font-bold text-primary">Dog Duty Pros</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-primary focus:outline-none"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200"
          >
            Home
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onServicesClick);
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200"
          >
            Services
          </a>
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onPricingClick);
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200"
          >
            Pricing
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onAboutClick);
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onContactClick);
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200"
          >
            Contact
          </a>
          <a
            href="#get-started"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onGetStartedClick);
            }}
            className="font-bubble px-8 py-2 text-white rounded-full transition duration-200"
            style={{ backgroundColor: "#990000", minWidth: "200px", textAlign: "center" }}
          >
            Take A Load Off!
          </a>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-white px-4 py-2 shadow-inner ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col space-y-3 pb-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200 py-2"
          >
            Home
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onServicesClick);
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200 py-2"
          >
            Services
          </a>
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onPricingClick);
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200 py-2"
          >
            Pricing
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onAboutClick);
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200 py-2"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onContactClick);
            }}
            className="font-medium text-gray-700 hover:text-primary transition duration-200 py-2"
          >
            Contact
          </a>
          <a
            href="#get-started"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(onGetStartedClick);
            }}
            className="font-bubble text-center px-5 py-2 bg-destructive text-white rounded-full hover:bg-red-600 transition duration-200"
          >
            Take A Load Off!
          </a>
        </div>
      </div>
    </header>
  );
}
