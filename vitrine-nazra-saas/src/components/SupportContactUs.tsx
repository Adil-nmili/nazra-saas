import React, { useState } from "react";
import { Ellipsis, MessageCircle, X } from "lucide-react";
import { aiChatBrain } from "../lib/ChatBrain";

// Simple chatbot function for free
const fakeAIResponse = async (message: string) => {
  // Free AI logic example (you can replace with API call)
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      if (message.toLowerCase().includes("hello")) resolve("Hi there! How can I help you today?");
      else if (message.toLowerCase().includes("price")) resolve("Our prices depend on the product. Can you specify which one?");
      else resolve("Thanks for your message! We'll get back to you shortly.");
    }, 800);
  });
};

const SupportChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);

const handleSend = async () => {
  if (!input.trim()) return;

  // Show user message
  setMessages(prev => [...prev, { sender: "user", text: input }]);
  const userMessage = input;
  setInput("");

  // Get AI response from OpenRouter
  const botReply = await aiChatBrain(userMessage);
  setMessages(prev => [...prev, { sender: "bot", text: botReply }]);
};


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
          <div className="p-4 text-gray-700 text-sm max-h-80 overflow-y-auto flex flex-col gap-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user" ? "self-end bg-[#52b788] text-white" : "self-start bg-[#e6f2ea]"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-4 flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border border-[#b7e4c7] rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#52b788]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-[#52b788] text-white px-3 py-2 rounded-r-lg hover:bg-[#40916c] transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
      <div className="w-full flex items-center justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 rounded-full bg-gradient-to-r from-[#52b788] to-[#2d6a4f] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 focus:outline-none"
        >
          {isOpen ? <Ellipsis /> : <MessageCircle size={24} />}
        </button>
      </div>
    </div>
  );
};

export default SupportChatButton;
