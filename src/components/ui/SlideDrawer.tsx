"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface SlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

export default function SlideDrawer({
  isOpen,
  onClose,
  title,
  children,
  width = "max-w-md", // Default width
}: SlideDrawerProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[100] bg-[#141413]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[110] w-full ${width} bg-white border-l border-[#141413]/10 shadow-2xl flex flex-col transform transition-transform duration-300 animate-in slide-in-from-right`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#141413]/8 bg-[#F1F0EF]">
          <h2 className="text-xl font-medium font-heading text-[#141413]">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-[#887C71] hover:text-[#141413] rounded-full hover:bg-[#141413]/5 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </>
  );
}
