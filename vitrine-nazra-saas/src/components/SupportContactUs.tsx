import React, { useState } from "react";
import { Ellipsis, MessageCircle, X } from "lucide-react";

const SupportChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="z-50 fixed bottom-6 right-6">
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-[#d8f3dc] overflow-hidden animate-slide-up">
          <div className="flex items-center justify-between bg-gradient-to-r from-[#52b788] to-[#2d6a4f] text-white px-4 py-3">
            <h3 className="text-sm font-semibold">Nazra Support</h3>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-80">
              <X size={18} />
            </button>
          </div>
          <div className="p-4 text-gray-700 text-sm">
            👋 Hi there! How can we help you today?  
            <div className="mt-3 flex">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-[#b7e4c7] rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#52b788]"
              />
              <button className="bg-[#52b788] text-white px-3 py-2 rounded-r-lg hover:bg-[#40916c] transition">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
        <div className="w-full flex items-center justify-end">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 rounded-full bg-gradient-to-r from-[#52b788] to-[#2d6a4f] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 focus:outline-none"
      >
        {
            isOpen ? <Ellipsis />:
        <MessageCircle size={24} />
        }
      </button>
            
        </div>
    </div>
  );
};

export default SupportChatButton;
