import React from "react";
import Logo from "./Logo";

const Footer: React.FC = () => {
  return (
    <footer className="from-[#1b4332] via-[#2d6a4f] to-[#081c15] text-white py-16 px-6 md:px-20 mt-8 relative w-full bg-gradient-to-br">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          
          <Logo/>
          <p className="text-[#b7e4c7]/80">
            Empowering merchants to launch and scale their sunglasses stores with ease, speed, and style.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
          <ul className="space-y-2 text-[#b7e4c7]">
            <li><a href="/features" className="hover:text-[#74c69d] transition">Features</a></li>
            <li><a href="/pricing" className="hover:text-[#74c69d] transition">Pricing</a></li>
            <li><a href="/how-it-works" className="hover:text-[#74c69d] transition">How It Works</a></li>
            <li><a href="/faq" className="hover:text-[#74c69d] transition">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
          <ul className="space-y-2 text-[#b7e4c7]">
            <li><a href="/about" className="hover:text-[#74c69d] transition">About</a></li>
            <li><a href="/blog" className="hover:text-[#74c69d] transition">Blog</a></li>
            <li><a href="/contact" className="hover:text-[#74c69d] transition">Contact</a></li>
            <li><a href="/support" className="hover:text-[#74c69d] transition">Support</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
          <p className="text-[#b7e4c7]/80 mb-4">Get the latest updates and news from Nazra.</p>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="p-3 rounded-md border border-[#95d5b2] flex-1 text-white outline-none "
            />
            <button
              type="submit"
              className=" bg-white border border-sea_green text-[#1B4332] hover:bg-[#1B4332] hover:border-white hover:text-white font-semibold px-6 py-3 rounded-md  transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 flex justify-center space-x-6">
        <a >
          <img src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" alt="facebook"  className="w-8 h-8"/>
        </a>
        <a >
              <img src="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000" alt="facebook"  className="w-8 h-8"/>
        </a>
        <a >
              <img src="https://img.icons8.com/?size=100&id=13930&format=png&color=000000" alt="facebook"  className="w-8 h-8"/>
        </a>
            <a >
          <img src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000" alt="facebook"  className="w-8 h-8"/>
        </a>
      </div>

      <div className="mt-10 text-center text-[#b7e4c7]/70 text-sm">
        &copy; {new Date().getFullYear()} Nazra SaaS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
