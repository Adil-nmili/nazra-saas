import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Nazra SaaS?",
    answer:
      "Nazra SaaS is a platform that allows merchants to easily launch their own sunglasses stores with dashboards, analytics, and payment integration — all in minutes.",
  },
  {
    question: "Do I need coding skills to use Nazra?",
    answer:
      "Not at all! Nazra SaaS is fully no-code. You can customize your store’s look, products, and domain directly from your dashboard.",
  },
  {
    question: "Which payment methods are supported?",
    answer:
      "Nazra supports Stripe for secure global payments. Local Moroccan payment gateways are planned in future updates.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes, you can connect your own custom domain to make your store look fully branded and professional.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! You can start with a 14-day free trial — no credit card required. Try it, build your store, and upgrade when ready.",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b relative py-20 px-6 md:px-20" id="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#1b4332] mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[#b7e4c7] rounded-xl bg-white/70 backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-5 flex justify-between items-center text-[#1b4332] font-semibold"
              >
                {faq.question}
                <span
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-45 text-[#2d6a4f]" : "rotate-0 text-[#40916c]"
                  } text-2xl`}
                >
                  +
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "max-h-40 p-5 pt-0" : "max-h-0"
                } text-[#2d6a4f]`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#74c69d]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#40916c]/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default FAQSection;
