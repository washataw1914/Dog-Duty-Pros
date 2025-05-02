import { Star, StarHalf } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Happy Customers, Happier Lawns!</h2>
          <p className="section-subtitle">
            These folks stepped in it (figuratively) when they found us. Now they're walking on cloud nine (and clean grass)!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all border-2 border-transparent hover:border-primary">
            <div className="flex items-center mb-4">
              <div className="flex" style={{ color: "#F4F00F" }}>
                <Star style={{ fill: "#F4F00F" }} size={20} />
                <Star style={{ fill: "#F4F00F" }} size={20} />
                <Star style={{ fill: "#F4F00F" }} size={20} />
                <Star style={{ fill: "#F4F00F" }} size={20} />
                <Star style={{ fill: "#F4F00F" }} size={20} />
              </div>
              <span className="ml-2 text-gray-600">5.0</span>
            </div>
            <p className="text-gray-700 mb-6 italic">
              "With 3 large dogs, I was stepping in 'land mines' daily. Dog Duty Pros saved my shoes and my sanity! Now I can actually walk in my yard without doing the 'poop dodge dance'!"
            </p>
            <div className="flex items-center">
              <img
                src="./images/testimonial-person1.svg"
                alt="Sarah M. with her dogs"
                className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-primary shadow-md"
              />
              <div>
                <h4 className="font-semibold">Sarah M.</h4>
                <p className="text-sm text-gray-600">Dog Mom of 3</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all border-2 border-transparent hover:border-destructive">
            <div className="flex items-center mb-4">
              <div className="flex" style={{ color: "#F4F00F" }}>
                <Star style={{ fill: "#F4F00F" }} size={20} />
                <Star style={{ fill: "#F4F00F" }} size={20} />
                <Star style={{ fill: "#F4F00F" }} size={20} />
                <Star style={{ fill: "#F4F00F" }} size={20} />
                <Star style={{ fill: "#F4F00F" }} size={20} />
              </div>
              <span className="ml-2 text-gray-600">5.0</span>
            </div>
            <p className="text-gray-700 mb-6 italic">
              "Our apartment complex used to be a minefield. Now thanks to Dog Duty Pros, residents can actually see the grass! One tenant said it best: 'I forgot our lawn was green, not brown with polka dots!'"
            </p>
            <div className="flex items-center">
              <img
                src="./images/testimonial-person2.svg"
                alt="Michael T. with dog"
                className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-destructive shadow-md"
              />
              <div>
                <h4 className="font-semibold">Michael T.</h4>
                <p className="text-sm text-gray-600">Property Manager</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all border-2 border-transparent hover:border-primary/80">
            <div className="flex items-center mb-4">
              <div className="flex" style={{ color: "#F4F00F" }}>
                <Star style={{ fill: "#F4F00F" }} size={20} />
                <Star style={{ fill: "#F4F00F" }} size={20} />
                <Star style={{ fill: "#F4F00F" }} size={20} />
                <Star style={{ fill: "#F4F00F" }} size={20} />
                <Star style={{ fill: "#F4F00F" }} size={20} />
              </div>
              <span className="ml-2 text-gray-600">5.0</span>
            </div>
            <p className="text-gray-700 mb-6 italic">
              "I used to ask 'who let the dogs out?' Now I ask 'who cleaned the poop up?' Dog Duty Pros is worth every penny! My kids play outside again and my husband no longer has his 'special poop shoes' by the door. Marriage saved!"
            </p>
            <div className="flex items-center">
              <img
                src="./images/testimonial-person3.svg"
                alt="Jessica K. with kids and dog"
                className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-primary/80 shadow-md"
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
