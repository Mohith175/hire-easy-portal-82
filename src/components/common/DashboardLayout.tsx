
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ChevronDown, 
  ChevronLeft, 
  LogOut, 
  Menu, 
  User, 
  Briefcase, 
  Grid, 
  Users, 
  Tag, 
  FileText, 
  Settings,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getSidebarLinks = () => {
    if (user?.role === "ADMIN") {
      return [
        { path: "/admin/dashboard", label: "Dashboard", icon: <Grid size={20} /> },
        { path: "/admin/categories", label: "Job Categories", icon: <Tag size={20} /> },
        { path: "/admin/employers", label: "Employers", icon: <Briefcase size={20} /> },
        { path: "/admin/employees", label: "Job Seekers", icon: <Users size={20} /> },
      ];
    } else if (user?.role === "EMPLOYER") {
      return [
        { path: "/employer/dashboard", label: "Dashboard", icon: <Grid size={20} /> },
        { path: "/employer/post-job", label: "Post a Job", icon: <FileText size={20} /> },
        { path: "/employer/applications", label: "Applications", icon: <Briefcase size={20} /> },
        { path: "/employer/profile", label: "Profile", icon: <User size={20} /> },
      ];
    } else if (user?.role === "EMPLOYEE") {
      return [
        { path: "/employee/dashboard", label: "Dashboard", icon: <Grid size={20} /> },
        { path: "/employee/applications", label: "My Applications", icon: <Briefcase size={20} /> },
        { path: "/employee/profile", label: "Profile", icon: <User size={20} /> },
      ];
    }
    
    return [];
  };

  const navLinks = getSidebarLinks();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <aside 
        className={cn(
          "bg-white shadow-md hidden md:flex flex-col transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Sidebar Header */}
        <div className={cn(
          "flex items-center p-4 border-b h-16",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <Link to="/" className="text-xl font-bold text-primary">
              HireEasy
            </Link>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-full p-2"
          >
            <ChevronLeft 
              className={cn(
                "transition-transform duration-300",
                collapsed ? "rotate-180" : ""
              )} 
            />
          </Button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center py-3 px-4 rounded-md transition-colors",
                location.pathname === link.path 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-gray-700 hover:bg-gray-100",
                collapsed ? "justify-center" : ""
              )}
            >
              <span className="flex-shrink-0">{link.icon}</span>
              {!collapsed && <span className="ml-3">{link.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className={cn(
              "text-red-500 hover:text-red-600 hover:bg-red-50 w-full",
              collapsed ? "justify-center" : ""
            )}
          >
            <LogOut size={20} />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-6">
          <div className="flex justify-between items-center w-full">
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-gray-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>

            {/* Page Title - can be dynamic */}
            <div className="md:ml-0 flex justify-center md:justify-start flex-1">
              <h1 className="text-xl font-semibold text-gray-800">
                {user?.role} Dashboard
              </h1>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                  {user?.firstName?.charAt(0)}
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium">{user?.firstName} {user?.lastName}</div>
                  <div className="text-xs text-gray-500">{user?.role}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" onClick={() => setMobileMenuOpen(false)}>
            <div 
              className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg animate-slide-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <Link to="/" className="text-xl font-bold text-primary">
                  HireEasy
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full p-2"
                >
                  <ChevronLeft className="rotate-180" />
                </Button>
              </div>

              {/* Mobile Sidebar User */}
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                    {user?.firstName?.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{user?.firstName} {user?.lastName}</div>
                    <div className="text-sm text-gray-500">{user?.role}</div>
                  </div>
                </div>
              </div>

              {/* Mobile Sidebar Links */}
              <nav className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "flex items-center py-3 px-4 rounded-md transition-colors",
                      location.pathname === link.path 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex-shrink-0">{link.icon}</span>
                    <span className="ml-3">{link.label}</span>
                  </Link>
                ))}

                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center py-3 px-4 rounded-md w-full text-red-500 hover:text-red-600 hover:bg-red-50 justify-start"
                >
                  <LogOut size={20} />
                  <span className="ml-3">Logout</span>
                </Button>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
