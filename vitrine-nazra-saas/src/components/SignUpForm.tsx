import React from 'react'

function SignUpForm() {
  return (
    <div>
            <div>
              <label className="text-sm text-[#1b4332] block mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-[#b7e4c7] rounded-md p-2 focus:border-[#52b788] focus:ring-1 focus:ring-[#52b788] outline-none bg-white"
                required
                name="name"
              />
            </div>
            <div>
              <label className="text-sm text-[#1b4332] block mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-[#b7e4c7] rounded-md p-2 focus:border-[#52b788] focus:ring-1 focus:ring-[#52b788] outline-none bg-white"
                required
                name="email"
              />
            </div>
            <div>
                
              <label className="text-sm text-[#1b4332] block mb-1">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full border border-[#b7e4c7] rounded-md p-2 focus:border-[#52b788] focus:ring-1 focus:ring-[#52b788] outline-none bg-white"
                required
                name="password"
              />
            </div>
                        <div>
              <label className="text-sm text-[#1b4332] block mb-1">Confir Password</label>
              <input
                type="confirm"
                placeholder="confirm password"
                className="w-full border border-[#b7e4c7] rounded-md p-2 focus:border-[#52b788] focus:ring-1 focus:ring-[#52b788] outline-none bg-white"
                required
                name="confirmation_password"
              />
            </div>
    </div>
  )
}

export default SignUpForm