import React from "react";
import { FaRocket, FaChartLine, FaPaintBrush, FaCreditCard } from "react-icons/fa";
const SignIn: React.FC = () => {
    const features = [
    { icon: <FaRocket className=" text-xl" />, text: "Launch your own sunglasses store in minutes" },
    { icon: <FaChartLine className=" text-xl" />, text: "Track real-time analytics and performance" },
    { icon: <FaPaintBrush className=" text-xl" />, text: "Customize your store design and branding" },
    { icon: <FaCreditCard className=" text-xl" />, text: "Integrated payments and domain management" },
  ];
  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16 bg-[#f7fdf8]">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-[#1b4332] mb-2">
            Create an Account
          </h1>
          <p className="text-[#2d6a4f] mb-6">
            Want to join <span className="font-semibold text-[#40916c]">Nazra SaaS</span>? 
            Sign up to launch your store today.
          </p>

          <button className="w-full flex items-center justify-center gap-2 border border-[#b7e4c7] rounded-md py-2 bg-white hover:bg-[#d8f3dc] transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-[#1b4332] font-medium">Continue with Google</span>
          </button>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-[#b7e4c7]"></div>
            <span className="mx-2 text-[#40916c] text-sm">OR</span>
            <div className="flex-grow h-px bg-[#b7e4c7]"></div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-sm text-[#1b4332] block mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-[#b7e4c7] rounded-md p-2 focus:border-[#52b788] focus:ring-1 focus:ring-[#52b788] outline-none bg-white"
                required
              />
            </div>
            <div>
              <label className="text-sm text-[#1b4332] block mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-[#b7e4c7] rounded-md p-2 focus:border-[#52b788] focus:ring-1 focus:ring-[#52b788] outline-none bg-white"
                required
              />
            </div>
            <div>
              <label className="text-sm text-[#1b4332] block mb-1">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full border border-[#b7e4c7] rounded-md p-2 focus:border-[#52b788] focus:ring-1 focus:ring-[#52b788] outline-none bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2D6A4F] text-white py-2 rounded-md font-semibold hover:bg-[#40916C] transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-xs text-[#40916c] mt-4">
            By clicking “Create Account”, you agree to our Terms of Use and
            Privacy Policy.
          </p>
          <p className="text-sm text-[#2d6a4f] mt-4">
            Already have an account?{" "}
            <a href="/signin" className="text-[#52b788] hover:underline font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#081c15] text-white flex-col justify-center px-16">
        <h2 className="text-3xl font-bold mb-6">
          Accelerate Your Venture with Nazra SaaS.
        </h2>
    <ul className="space-y-4 mt-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-3 text-lg">
          {feature.icon}
          <span>{feature.text}</span>
        </li>
      ))}
    </ul>
      </div>
    </div>
  );
};

export default SignIn;
