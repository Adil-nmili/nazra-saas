import React, { useEffect, useState } from "react";
import { CheckCircle, Rocket, Store, CreditCard, Settings } from "lucide-react";
import Modal from "../components/Modal";
import SignIn from "../components/GetStarted/Sign";

const steps = [
  {
    icon: <Store className="text-[#52b788] w-8 h-8" />,
    title: "1. Create Your Store",
    desc: "Sign up and instantly launch your own sunglasses store — no coding required.",
  },
  {
    icon: <Settings className="text-[#40916c] w-8 h-8" />,
    title: "2. Customize & Brand",
    desc: "Pick a theme, upload your logo, and choose your colors to make it yours.",
  },
  {
    icon: <CreditCard className="text-[#2d6a4f] w-8 h-8" />,
    title: "3. Add Products & Payments",
    desc: "Add your sunglasses collection, set prices, and connect Stripe to get paid.",
  },
  {
    icon: <Rocket className="text-[#1b4332] w-8 h-8" />,
    title: "4. Launch & Grow",
    desc: "Go live with your store in minutes and start selling to customers worldwide.",
  },
];

const GetStarted: React.FC = () => {
    const [isOpen,setIsOpen] = useState(false);
    useEffect(()=>{
        window.scrollTo({top:0,behavior:"smooth"})
    },[])
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#B7E4C7] to-white text-[#081c15] flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-4xl text-center mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1b4332]">
          Get Started with <span className="text-[#2d6a4f]">Nazra SaaS</span>
        </h1>
        <p className="text-lg text-[#081c15]/80 max-w-2xl mx-auto">
          Launch your sunglasses store in minutes. No setup headaches, no complex tech — just focus on your brand and sales.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-lg font-semibold text-[#1b4332] mb-2">{step.title}</h3>
            <p className="text-sm text-[#081c15]/70">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button
        onClick={()=>setIsOpen(true)}
          className="inline-flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#40916c] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <CheckCircle size={20} />
          Start Your Free Trial
        </button>
        <p className="text-sm text-[#081c15]/70 mt-3">
          No credit card required — build and publish your store today.
        </p>
      </div>

        {
            isOpen && <Modal
                isOpen={isOpen}
                 onClose={()=>{setIsOpen(false)}} 
                 title={"Sign In "}
            >
                <SignIn/>
            </Modal>
        }

    </div>
  );
};

export default GetStarted;
