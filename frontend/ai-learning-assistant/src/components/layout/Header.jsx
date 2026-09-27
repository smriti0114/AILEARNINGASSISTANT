import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Bell, User, Menu } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-surface/80 backdrop-blur-xl border-b border-border-subtle/60">
      <div className="flex items-center justify-between h-full px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 text-muted hover:text-navy hover:bg-page rounded-xl transition-all duration-200"
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>

        <div className="hidden md:block"></div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="relative inline-flex items-center justify-center w-10 h-10 text-muted hover:text-navy hover:bg-page rounded-xl transition-all duration-200 group">
            <Bell size={20} strokeWidth={2} className="group-hover:scale-110 transition-transform duration-200" />
            
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-surface"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-border-subtle/60">
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-page transition-colors duration-200 cursor-pointer group">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-surface shadow-sm shadow-primary/20 group-hover:shadow-primary/30 transition-all duration-200">
                <User size={18} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">
                    {user?.username || "User"}
                </p>
                <p className="text-xs text-muted ">
                    {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
