import { Star, StarHalf } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">We Take The Load Off Their Lawn</h2>
          <p className="section-subtitle">
            Don't just take our word for it. See what our customers have to say about our service!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="text-yellow-400 flex">
                <Star className="fill-yellow-400" size={20} />
                <Star className="fill-yellow-400" size={20} />
                <Star className="fill-yellow-400" size={20} />
                <Star className="fill-yellow-400" size={20} />
                <Star className="fill-yellow-400" size={20} />
              </div>
              <span className="ml-2 text-gray-600">5.0</span>
            </div>
            <p className="text-gray-700 mb-6 italic">
              "With 3 large dogs, our yard was impossible to keep clean. Dog Duty Pros has been a lifesaver! Their weekly service means we can actually enjoy our backyard again. Worth every penny!"
            </p>
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
                alt="Sarah M."
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold">Sarah M.</h4>
                <p className="text-sm text-gray-600">Dog Mom of 3</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="text-yellow-400 flex">
                <Star className="fill-yellow-400" size={20} />
                <Star className="fill-yellow-400" size={20} />
                <Star className="fill-yellow-400" size={20} />
                <Star className="fill-yellow-400" size={20} />
                <Star className="fill-yellow-400" size={20} />
              </div>
              <span className="ml-2 text-gray-600">5.0</span>
            </div>
            <p className="text-gray-700 mb-6 italic">
              "As a property manager for a large apartment complex, I needed a reliable service. Dog Duty Pros has been professional, thorough, and our residents are thrilled with the cleaner common areas."
            </p>
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
                alt="Michael T."
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold">Michael T.</h4>
                <p className="text-sm text-gray-600">Property Manager</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="text-yellow-400 flex">
                <Star className="fill-yellow-400" size={20} />
                <Star className="fill-yellow-400" size={20} />
                <Star className="fill-yellow-400" size={20} />
                <Star className="fill-yellow-400" size={20} />
                <StarHalf className="fill-yellow-400" size={20} />
              </div>
              <span className="ml-2 text-gray-600">4.5</span>
            </div>
            <p className="text-gray-700 mb-6 italic">
              "I was skeptical at first about hiring someone for this, but now I can't imagine life without Dog Duty Pros! My kids can play freely in the yard, and I don't have to worry about the mess. Complete game-changer!"
            </p>
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
                alt="Jessica K."
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold">Jessica K.</h4>
                <p className="text-sm text-gray-600">Busy Mom</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
