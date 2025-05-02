export default function Stats() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-primary/5 rounded-lg p-6">
            <div className="font-bubble text-4xl text-primary mb-2">5,000+</div>
            <div className="text-gray-700">Yards Cleaned</div>
          </div>
          <div className="bg-primary/5 rounded-lg p-6">
            <div className="font-bubble text-4xl text-primary mb-2">98%</div>
            <div className="text-gray-700">Happy Customers</div>
          </div>
          <div className="bg-primary/5 rounded-lg p-6">
            <div className="font-bubble text-4xl text-primary mb-2">24/7</div>
            <div className="text-gray-700">Online Booking</div>
          </div>
          <div className="bg-primary/5 rounded-lg p-6">
            <div className="font-bubble text-4xl text-primary mb-2">100%</div>
            <div className="text-gray-700">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}
