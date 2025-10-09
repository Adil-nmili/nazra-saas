import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    // { name: 'Services', path: '/#services' },
    { name: 'How it works', path: '/#how-it-works' },
    { name: 'Testimonials', path: '/#testimonials' },
    { name: 'Pricing', path: '/#pricing' },
    { name: 'FAQ', path: '/#faq' },
    {name:'blog',path:"/blog"}
  ];

  return (
    <header className='sticky top-0 z-50'>
      <div className='h-2 bg-white/0 backdrop-blur-2xl w-[90%] mx-auto '>
      </div>
    <nav className=" from-[#1b4332] via-[#2d6a4f] to-[#081c15] bg-gradient-to-br shadow  text-white w-[90%] mx-auto rounded-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Logo/>
          </div>

          <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
            <div className="flex space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-[#2D6A4F] 
                    ${
                    location.pathname === link.path
                      ? 'text-sea_green'
                      : 'text-nyanza hover:text-sea_green'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <Link
              to="/get-started"
              className="ml-4 px-4 py-2 bg-sea_green text-nyanza rounded-md text-sm font-medium hover:bg-mint transition-colors bg-white border border-sea_green text-[#1B4332] hover:bg-[#1B4332] hover:border-white hover:text-white"
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-nyanza hover:bg-brunswick_green focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-nyanza">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium 
                  ${
                  location.pathname === link.path
                    ? 'text-sea_green'
                    : 'text-nyanza hover:bg-brunswick_green hover:text-nyanza'
                }`}
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/get-started"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 px-4 py-2 bg-sea_green text-nyanza rounded-md text-base font-medium hover:bg-mint transition-colors bg-white border border-sea_green text-[#1B4332] hover:bg-[#1B4332] hover:border-white hover:text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>

    </header>
  );
};

export default Navbar;