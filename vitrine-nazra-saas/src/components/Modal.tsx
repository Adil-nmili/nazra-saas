import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      title={title}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl md:w-[80%] h-[95%] transform transition-all duration-300 scale-95 opacity-0 animate-fadeIn overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
        className="absolute top-2 z-50 right-2 text-gray-400 px-4 py-2 rounded-full hover:text-gray-900 text-3xl leading-none"
        onClick={onClose}
        >
            &times;
        </button>

        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
