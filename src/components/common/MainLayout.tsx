
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Briefcase, 
  User, 
  Menu, 
  LogOut, 
  X,
  Search,
  Bell,
  FilePlus,
  FileCheck
} from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderNavLinks = () => {
    return (
      <>
        <li>
          <Link 
            to="/" 
            className="flex items-center px-4 py-2 hover:text-primary transition-colors"
          >
            <Home size={18} className="mr-2" />
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/jobs" 
            className="flex items-center px-4 py-2 hover:text-primary transition-colors"
          >
            <Briefcase size={18} className="mr-2" />
            Browse Jobs
          </Link>
        </li>
        
        {isAuthenticated && (
          <>
            <li>
              <Link 
                to="/jobs/post" 
                className="flex items-center px-4 py-2 hover:text-primary transition-colors"
              >
                <FilePlus size={18} className="mr-2" />
                Post Job
              </Link>
            </li>
            <li>
              <Link 
                to="/applications" 
                className="flex items-center px-4 py-2 hover:text-primary transition-colors"
              >
                <FileCheck size={18} className="mr-2" />
                My Applications
              </Link>
            </li>
            <li>
              <Link 
                to="/my-jobs" 
                className="flex items-center px-4 py-2 hover:text-primary transition-colors"
              >
                <Briefcase size={18} className="mr-2" />
                My Jobs
              </Link>
            </li>
          </>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">HireEasy</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                {renderNavLinks()}
              </ul>
            </nav>

            {/* Auth Buttons or User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Bell className="text-gray-600 hover:text-primary cursor-pointer transition-colors" />
                  <div className="relative">
                    <Link 
                      to="/profile"
                      className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                        {user?.firstName?.charAt(0) || "U"}
                      </div>
                      <span className="font-medium">{user?.firstName || "User"}</span>
                    </Link>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLogout}
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Join Now</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t py-4 animate-fade-in">
            <div className="container mx-auto px-4">
              <nav>
                <ul className="space-y-2">
                  {renderNavLinks()}
                </ul>
              </nav>
              
              {/* Auth Buttons for Mobile */}
              <div className="mt-4 pt-4 border-t">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link 
                      to="/profile"
                      className="flex items-center space-x-2 p-2"
                    >
                      <User size={18} />
                      <span>Profile</span>
                    </Link>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={handleLogout}
                      className="w-full"
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login">
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link to="/register">
                      <Button className="w-full">Join Now</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">HireEasy</h3>
              <p className="text-gray-300">
                Connecting the right talent with the right opportunities.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Job Seekers</h4>
              <ul className="space-y-2">
                <li><Link to="/jobs" className="text-gray-300 hover:text-white">Browse Jobs</Link></li>
                <li><Link to="/register" className="text-gray-300 hover:text-white">Create Account</Link></li>
                <li><Link to="/login" className="text-gray-300 hover:text-white">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2">
                <li><Link to="/jobs/post" className="text-gray-300 hover:text-white">Post a Job</Link></li>
                <li><Link to="/my-jobs" className="text-gray-300 hover:text-white">Manage Jobs</Link></li>
                <li><Link to="/register" className="text-gray-300 hover:text-white">Create Account</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <address className="not-italic text-gray-300">
                <p>123 Job Street</p>
                <p>Employment City, EC 12345</p>
                <p className="mt-2">contact@hireeasy.com</p>
                <p>(123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} HireEasy Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
