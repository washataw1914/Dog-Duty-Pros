import { Link } from "wouter";

interface CallToActionProps {
  onGetStartedClick: () => void;
}

export default function CallToAction({ onGetStartedClick }: CallToActionProps) {
  return (
    <section id="get-started" className="py-16 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-bubble text-3xl md:text-4xl text-white mb-6">Ready to Take A Load Off Your Lawn?</h2>
        <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied pet owners who've reclaimed their yards with Dog Duty Pros. Get started today and see the difference!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={onGetStartedClick}
            className="font-bubble inline-block px-8 py-4 bg-destructive text-white rounded-full text-lg hover:bg-red-600 transition duration-200 shadow-lg"
          >
            Take A Load Off Your Lawn!
          </button>
          <Link
            to="/schedule"
            className="font-bubble inline-block px-8 py-4 bg-white text-primary rounded-full text-lg hover:bg-gray-100 transition duration-200 shadow-lg"
          >
            Schedule Now
          </Link>
        </div>
      </div>
    </section>
  );
}
