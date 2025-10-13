import React from 'react';
import { FiUsers } from 'react-icons/fi';
import {Link} from 'react-router-dom'
const activeUsers = [
  { id: 1, name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Sarah Williams', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=3' },
];

function HeroSection() {
  return (
    <section className="px-4 w-[90%] mx-auto my-20">
      <div className="w-full mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-12">
          <div className="md:w-1/2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex -space-x-2">
                {activeUsers.map((user, index) => (
                  <img
                    key={user.id}
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-1 border-nyanza"
                    style={{ zIndex: activeUsers.length - index }}
                  />
                ))}
              </div>
              <div className="text-sm text-brunswick_green">
                <span className="font-medium text-sea_green">+100 others</span> are using our platform
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brunswick_green mb-4 text-[#081C15]">
              Welcome to Nazra SaaS
            </h1>
            <p className="text-xl text-brunswick_green/80 mb-8">
              From automation to analytics, Nazra delivers cutting-edge SaaS tools that help you streamline operations and scale faster.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* <Link 
                to={'/get-started'}
                className="px-6 py-3 bg-[#1B4332] text-nyanza rounded-lg font-medium hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg text-white cursor-pointer hover:bg-[#081C15]">
                  Get Started
              </Link> */}
              <Link
                to="/get-started"
                className="relative px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg overflow-hidden cursor-pointer border border-white"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#081c15a8] via-[#081C15] to-[#081c15a8] animate-gradient-move"></span>

                <span className="relative z-10 text-white">Get Started</span>
              </Link>



              <button className="px-6 py-3 border-2 border-[#1B4332] text-[#1B4332] bg-transparent rounded-lg font-medium hover:bg-[#1B4332]/10 transition-colors cursor-pointer">
                Learn More
              </button> 
            </div>
          </div>
          <div className='relative md:w-2/5 h-[400px] flex items-center justify-center'>
            <div className='absolute w-[300px] h-[300px] rounded-full bg-[#2D6A4F] blur-xl opacity-50 -top-7 -right-5' />
            <div className='absolute w-[300px] h-[300px] rounded-full bg-[#2D6A4F] blur-2xl opacity-70 -bottom-9 -left-8' />
            <div className='relative z-10 w-full h-full max-w-[400px] max-h-[400px] rounded-2xl overflow-hidden animate-float shadow-xl border border-[#D8F3DC]'>
              <img 
                src="/Hero-section-assets/img-1.jpg" 
                alt="img-hero-section"
                className='w-full h-full object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;