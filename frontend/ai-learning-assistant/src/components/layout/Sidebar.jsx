import React from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  BookOpen,
  X,
} from "lucide-react";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { to: '/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
    { to: '/documents', icon: FileText, text: 'Documents' },
    { to: '/flashcards', icon: BookOpen, text: 'Flashcards' },
    { to: '/profile', icon: User, text: 'Profile' },
  ];

  return <>

   <div 
    className={`fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity duration-300 ${
    isSidebarOpen ? 'opacity-0' : 'opacity-0 pointer-events-none'
    }`}
    onClick={toggleSidebar}
    aria-hidden="true"
    ></div>

    <aside 
    className={`fixed top-0 left-0 h-full w-64 bg-surface/90 backdrop-blur-lg border-r border-border-subtle/60 z-50 md:relative md:w-64 md:shrink-0 md:flex md:flex-col md:translate-x-0 transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
    >
        {/* Logo and Close button for mobile */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-border-subtle/60">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 shrink-0 overflow-hidden rounded-full shadow-sm shadow-primary/20 ring-1 ring-border-subtle">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover scale-110" />
            </div>
            <h1 className="text-sm md:text-base font-bold text-navy tracking-tight">AI Learning Assistant</h1>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-muted hover:text-navy">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */} 
        <nav className="flex-1 px-3 py-6 space-y-1.5">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-surface shadow-sm shadow-primary/25'
                    : 'text-body hover:bg-page hover:text-navy'
                }` 
              }
            >
               {({ isActive }) => (
                <>
                   <link.icon
                     size={18}
                     strokeWidth={2.5}
                     className={`transition-transform duration-200 ${
                       isActive ? '' : 'group-hover:scale-110'
                     }`}
                    />
                    {link.text}
                </>
                )} 
            </NavLink>
          ))}
        </nav> 

        {/* Logout Section */}
        <div className="px-3 py-4 border-border-subtle/60">
          <button
            onClick={handleLogout}
            className="group flex items-center gap-3 w-full px-4 py-2.5 text-sm font-semibold text-body hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
          >
            <LogOut
              size={18}
              strokeWidth={2.5}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            Logout
          </button>
        </div> 
    </aside>

  </>
  
};

export default Sidebar;