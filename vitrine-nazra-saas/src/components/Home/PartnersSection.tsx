import React from "react";

const partners = [
  "Atlas Cloud",
  "Maghreb AI",
  "SaharaTech",
  "Casabyte",
  "RifSoft",
];

const PartnersSection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-blue-50 to-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Trusted by Leading Innovators
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Nazra is proud to collaborate with forward-thinking Moroccan startups
          and enterprises building the next generation of digital solutions.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 place-items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-blue-100 p-6 transition-all transform hover:-translate-y-2 w-36 h-36 flex flex-col items-center justify-center"
            >
              {/* Unified symbolic logo */}
              <div className="w-10 h-10 mb-3 bg-gradient-to-br from-[#081C15] to-[#2D6A4F] rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
              </div>

              <h3 className="text-gray-700 font-semibold text-sm text-center">
                {partner}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
