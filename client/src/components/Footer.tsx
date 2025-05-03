import { Phone, Mail, Clock } from "lucide-react";
import { Link } from "wouter";

interface FooterProps {
  onServicesClick: () => void;
  onPricingClick: () => void;
  onAboutClick: () => void;
  onContactClick: () => void;
}

export default function Footer({
  onServicesClick,
  onPricingClick,
  onAboutClick,
  onContactClick
}: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <svg
                className="h-10 w-10 text-white"
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
              <span className="font-bubble text-xl font-bold text-white">Dog Duty Pros</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional pet waste removal service. Making yards clean and people happy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bubble text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => {
                    e.preventDefault();
                    onServicesClick();
                  }}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  onClick={(e) => {
                    e.preventDefault();
                    onPricingClick();
                  }}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a 
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    onAboutClick();
                  }}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    onContactClick();
                  }}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bubble text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  Weekly Cleaning
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  Bi-Weekly Cleaning
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  One-Time Cleanup
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  Commercial Properties
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                  Special Events
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bubble text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Phone className="text-destructive mt-1 mr-2" size={18} />
                <span className="text-gray-400">(501) 470-8886</span>
              </li>
              <li className="flex items-start">
                <Mail className="text-destructive mt-1 mr-2" size={18} />
                <span className="text-gray-400">info@dogduty.biz</span>
              </li>
              <li className="flex items-start">
                <Clock className="text-destructive mt-1 mr-2" size={18} />
                <span className="text-gray-400">Mon-Fri: 8am-6pm, Sat: 9am-3pm</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Dog Duty Pros. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition duration-200">
                Terms of Service
              </Link>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-200">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
