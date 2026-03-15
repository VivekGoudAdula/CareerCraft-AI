import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Briefcase, User, FileText, Layout as LayoutIcon, ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navItems = [
    { name: "Landing", path: "/", icon: LayoutIcon },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Resume", path: "/resume", icon: FileText },
    { name: "Portfolio", path: "/portfolio", icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-[#1A1A1A]">
      <header className="bg-white border-b border-[#E9ECEF] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white group-hover:bg-[#333] transition-colors">
              <Briefcase size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight">CareerCraft AI</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                  location.pathname === item.path
                    ? "bg-black text-white"
                    : "text-[#6C757D] hover:bg-[#F1F3F5] hover:text-black"
                )}
              >
                <item.icon size={16} />
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="md:hidden">
            {/* Mobile menu could go here, but keeping it simple for now */}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {children}
      </main>

      <footer className="bg-white border-t border-[#E9ECEF] py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#6C757D] text-sm">
            © 2026 CareerCraft AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-[#6C757D]">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-black transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
