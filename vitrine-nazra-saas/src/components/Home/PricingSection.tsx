import React from "react";

interface Plan {
  name: string;
  price: string;
  features: string[];
  color: string;
  recommended?: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$29/mo",
    features: [
      "Single Store",
      "Basic Dashboard & Analytics",
      "Unlimited Products",
      "Stripe Payment Integration",
      "Basic Theme",
      "Email Support",
    ],
    color: "#d8f3dc", // Nyanza
  },
  {
    name: "Growth",
    price: "$79/mo",
    features: [
      "Up to 5 Stores",
      "Advanced Dashboard & Analytics",
      "Priority Stripe Integration",
      "Custom Domains",
      "Advanced Themes",
      "Chat & Email Support",
    ],
    color: "#74c69d", // Mint
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    features: [
      "Unlimited Stores",
      "Enterprise Dashboard & Analytics",
      "Dedicated Account Manager",
      "Custom Integrations",
      "White-label Branding",
      "24/7 Support",
    ],
    color: "#52b788", // Mint 2
  },
];

const PricingSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#f7fdf8] relative overflow-hidden w-full" id="pricing">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-[#081c15] mb-4">
          Choose Your Plan
        </h2>
        <p className="text-[#2d6a4f]/80 mb-16 max-w-2xl mx-auto">
          Nazra SaaS empowers merchants to launch and scale their own sunglasses stores
          with dashboards, analytics, payments, and custom branding. Pick the plan that fits your growth.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-lg p-8 flex flex-col items-center border border-[#95d5b2]/40 transition-transform hover:-translate-y-2 ${
                plan.recommended ? "scale-105 border-2 border-[#52b788]" : ""
              }`}
            >
                <div className="flex flex-col items-center justify-between mb-8 w-full">
              <h3 className="text-lg font-medium mb-4 text-[#1b4332] text-start w-full">
                {plan.name}
              </h3>
              <p className="text-3xl font-bold text-[#081c15] ">{plan.price}</p>
                    
                </div>
              <ul className="mb-6 text-[#081c15]/80 text-sm space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="inline-block w-3 h-3 bg-[#52b788] rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`px-6 py-3 rounded-lg w-full font-semibold text-white ${
                  plan.recommended
                    ? "bg-[#1B4332] hover:bg-[#40916c]"
                    : "bg-[#1B4332] hover:bg-[#52b788]"
                } transition`}
              >
                {plan.recommended ? "Get Started" : "Select Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#74c69d]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#40916c]/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default PricingSection;
