import React from "react";
import Logo from "./Logo";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1b4332] text-[#d8f3dc] py-16 px-6 md:px-20 mt-8 relative w-full">
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

        {/* Newsletter */}
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
        <span className="w-10 h-10 rounded-full bg-[#081C15] flex items-center justify-center cursor-pointer hover:bg-[#40916c] transition">F</span>
        <span className="w-10 h-10 rounded-full bg-[#081C15] flex items-center justify-center cursor-pointer hover:bg-[#40916c] transition">T</span>
        <span className="w-10 h-10 rounded-full bg-[#081C15] flex items-center justify-center cursor-pointer hover:bg-[#40916c] transition">L</span>
      </div>

      <div className="mt-10 text-center text-[#b7e4c7]/70 text-sm">
        &copy; {new Date().getFullYear()} Nazra SaaS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
