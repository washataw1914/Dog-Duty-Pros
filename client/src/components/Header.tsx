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
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <svg
              className="h-12 w-12 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 16l-6-6 6-6" />
              <path d="M18 18V6H8" />
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
            className="font-bubble px-5 py-2 bg-destructive text-white rounded-full hover:bg-red-600 transition duration-200"
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
