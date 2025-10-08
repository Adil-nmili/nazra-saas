import React from "react";

const CTASection: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-gradient-to-r from-[#74c69d] via-[#52b788] to-[#40916c] relative overflow-hidden w-[90%] rounded-lg mb-8 mt-20" >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Launch Your Sunglasses Store Today
        </h2>
        <p className="text-[#d8f3dc] mb-8 text-lg md:text-xl">
          Empower your business with Nazra SaaS. Create, customize, and scale your own online store in minutes — no coding required.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a
            href="/signup"
            className="bg-white text-[#2d6a4f] font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-[#d8f3dc] transition"
          >
            Get Started Free
          </a>
          <a
            href="/learn-more"
            className="border border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-[#2d6a4f] transition"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Decorative Background Circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#52b788]/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#40916c]/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default CTASection;
