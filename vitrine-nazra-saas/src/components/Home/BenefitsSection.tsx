import { CheckCircle2 } from "lucide-react";

const benefits = [
  {
    title: "Unified Control",
    description:
      "Manage projects, analytics, and clients from one seamless platform designed to simplify complex workflows.",
  },
  {
    title: "Data-Driven Growth",
    description:
      "Make smarter decisions with intelligent dashboards powered by real-time insights and predictive analytics.",
  },
  {
    title: "Secure & Scalable",
    description:
      "Built with enterprise-grade security and performance, ensuring your business grows safely and efficiently.",
  },
  {
    title: "Designed for Teams",
    description:
      "Collaborate effortlessly with team-based permissions, real-time updates, and integrated communication tools.",
  },
];

export default function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="relative py-24 bg-gradient-to-b from-[#b7e4c7] via-[#95d5b2] to-[#52b788] overflow-hidden rounded-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#081c15]/80 via-transparent to-transparent pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#081c15]">
            Empower Your Business <br />
            <span className="text-[#1b4332]">with Nazra Intelligence</span>
          </h2>
          <p className="mt-4 text-lg text-[#1b4332]/80 max-w-2xl mx-auto">
            Discover the power of simplicity and performance with an all-in-one SaaS platform built for modern teams.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-[#d8f3dc] hover:bg-[#b7e4c7] rounded-2xl shadow-xl p-8 border border-[#95d5b2]/40 
                         transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl animate-slideUp text-center"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex justify-center mb-5">
                <CheckCircle2 className="text-[#2d6a4f] w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold  text-[#1b4332] mb-3">
                {benefit.title}
              </h3>
              <p className="text-[#081c15]/70 leading-relaxed text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative background shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#74c69d]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#40916c]/30 rounded-full blur-3xl"></div>
    </section>
  );
}
