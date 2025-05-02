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
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleNavClick = (callback: () => void) => {
    setShowMobileMenu(false);
    callback();
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img 
                src="./images/logo for vector dog dutyyellow.png" 
                alt="Dog Duty Pros Logo"
                className="h-16 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
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
            <Link 
              href="/services" 
              className="font-medium text-gray-700 hover:text-primary transition duration-200 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Services
            </Link>
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

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-primary focus:outline-none p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <div className="px-4 py-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowMobileMenu(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="block py-2 text-gray-700 hover:text-primary"
            >
              Home
            </a>
            <Link 
              href="/services"
              onClick={() => setShowMobileMenu(false)}
              className="block py-2 text-gray-700 hover:text-primary"
            >
              Services
            </Link>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(onPricingClick);
              }}
              className="block py-2 text-gray-700 hover:text-primary"
            >
              Pricing
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(onAboutClick);
              }}
              className="block py-2 text-gray-700 hover:text-primary"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(onContactClick);
              }}
              className="block py-2 text-gray-700 hover:text-primary"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}