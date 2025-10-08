import React from "react";

const steps = [
  {
    title: "Sign Up & Create Account",
    description:
      "Register quickly with your email or social accounts and start exploring Nazra in minutes.",
    color: "#40916C", // Nyanza
  },
  {
    title: "Connect Your Tools",
    description:
      "Integrate your favorite apps and platforms for seamless workflow management.",
    color: "#2D6A4F", // Celadon
  },
  {
    title: "Track & Analyze",
    description:
      "Monitor your projects with real-time insights and actionable analytics.",
    color: "#1B4332", // Celadon 2
  },
  {
    title: "Collaborate & Grow",
    description:
      "Work efficiently with your team and scale your business with confidence.",
    color: "#081C15", // Mint
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-[#f7fdf8]" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-[#081c15] mb-4">
          How Nazra Works
        </h2>
        <p className="text-[#2d6a4f]/80 mb-16 max-w-2xl mx-auto">
          Follow these simple steps to get started and see how Nazra can streamline
          your workflow and boost your productivity.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center border border-[#95d5b2]/30 transition-transform hover:-translate-y-2"
            >
              <div
                className="w-16 h-16 mb-5 flex items-center justify-center rounded-full text-white font-bold text-lg"
                style={{ backgroundColor: step.color }}
              >
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-[#1b4332] mb-3">
                {step.title}
              </h3>
              <p className="text-[#081c15]/70 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative background circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#52b788]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#40916c]/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HowItWorksSection;
