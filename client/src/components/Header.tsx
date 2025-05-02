import { useState, useEffect } from "react";
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

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (callback: () => void) => {
    setMobileMenuOpen(false);
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

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-primary focus:outline-none p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white overflow-hidden transition-all duration-300 shadow-lg ${
          mobileMenuOpen ? "max-h-96 border-t border-gray-200" : "max-h-0"
        }`}
      >
        <div className="px-4 py-2">
          <div className="flex flex-col space-y-1">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-3 px-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(onServicesClick);
              }}
              className="py-3 px-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Services
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(onPricingClick);
              }}
              className="py-3 px-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Pricing
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(onAboutClick);
              }}
              className="py-3 px-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(onContactClick);
              }}
              className="py-3 px-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
