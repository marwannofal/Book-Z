const TestimonialsSection: React.FC = () => (
  <div className="max-w-screen-lg w-full text-center mb-16 fade-in opacity-0 mt-8 transition-opacity duration-600">
    <h2 className="text-3xl font-bold text-gray-800 mb-8">
      What Our Users Say
    </h2>
    <div className="flex flex-col md:flex-row justify-center gap-8">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 text-left"
        >
          <p className="text-md text-gray-600 italic mb-4">
            "{testimonial.feedback}"
          </p>
          <p className="text-lg font-semibold text-gray-800">
            - {testimonial.name}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const testimonials = [
  {
    name: "Emily R.",
    feedback:
      "Student Book Exchange has made it so much easier to find the books I need. I've saved so much money and met some great people!",
  },
  {
    name: "Michael T.",
    feedback:
      "The exchange process is seamless, and I love the rating system. It keeps everyone honest and ensures a good experience.",
  },
];

export default TestimonialsSection;
