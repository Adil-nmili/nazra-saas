import React from "react";

const testimonials = [
  {
    name: "Youssef El Amrani",
    role: "Store Owner — Marrakech",
    quote:
      "Nazra SaaS helped me launch my sunglasses store in just one hour. The dashboard and analytics are amazing!",
  },
  {
    name: "Sara Benali",
    role: "Merchant — Casablanca",
    quote:
      "Super smooth experience. Love the design themes and how easy it is to customize everything.",
  },
  {
    name: "Omar Rami",
    role: "Entrepreneur — Rabat",
    quote:
      "I manage three stores under one account thanks to Nazra. It's fast, powerful, and made for growth.",
  },
  {
    name: "Aya El Idrissi",
    role: "Retailer — Tangier",
    quote:
      "The support team is outstanding. Nazra SaaS is the best solution for Moroccan e-commerce merchants.",
  },
  {
    name: "Adam Lahlou",
    role: "Founder — Agadir",
    quote:
      "I love the clean dashboard and the integration with Stripe. Everything just works!",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-[#d8f3dc] via-[#b7e4c7] to-[#74c69d] w-full" id="testimonials">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-[#1b4332]">What Our Clients Say</h2>
        <p className="text-[#2d6a4f] mt-2">Trusted by growing merchants across Morocco</p>
      </div>

      {/* Infinite Scrolling Wrapper */}
      <div className="relative flex overflow-x-hidden">
        <div className="animate-scroll flex space-x-6">
          {[...testimonials, ...testimonials].map((t, index) => (
            <div
              key={index}
              className="min-w-[350px] bg-white/70 backdrop-blur-sm border border-[#95d5b2] rounded-2xl shadow-lg p-6"
            >
              <p className="text-[#1b4332] italic mb-4">“{t.quote}”</p>
              <div>
                <h4 className="font-semibold text-[#2d6a4f]">{t.name}</h4>
                <p className="text-sm text-[#40916c]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#d8f3dc] to-transparent"></div>
    </section>
  );
};

export default TestimonialsSection;
