import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/common/MainLayout";
import { ArrowRight, Briefcase, Search, Users } from "lucide-react";
const Index = () => {
  const {
    isAuthenticated,
    user
  } = useAuth();

  // Function to redirect to the appropriate dashboard based on user role
  const getDashboardLink = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "ADMIN":
        return "/admin/dashboard";
      case "EMPLOYER":
        return "/employer/dashboard";
      case "EMPLOYEE":
        return "/employee/dashboard";
      default:
        return "/";
    }
  };
  return <MainLayout>
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary/70 text-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-center bg-cover"></div>
        <div className="container mx-auto px-6 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Job Match Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Connecting talented professionals with the right opportunities.
              Start your journey with us today.
            </p>
            
            {isAuthenticated ? <Link to={getDashboardLink()}>
                <Button size="lg" className="group">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link> : <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <Link to="/register?role=EMPLOYEE">
                  <Button size="lg" className="w-full sm:w-auto font-mediumw-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 hover:shadow-lg transition duration-300 font-semibold">
                    I'm Looking for Jobs
                  </Button>
                </Link>
                <Link to="/register?role=EMPLOYER">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border border-white bg-transparent text-white hover:bg-white hover:text-blue-700 font-semibold">
                    I'm Hiring Talent
                  </Button>
                </Link>
              </div>}
          </div>
        </div>

        {/* Wave pattern */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="white">
            <path d="M0,96L80,101.3C160,107,320,117,480,101.3C640,85,800,43,960,32C1120,21,1280,43,1440,53.3L1440,320L0,320Z" />
          </svg>
        </div>
      </section>

      {/* Featured sections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-blue-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Search className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Opportunities</h3>
              <p className="text-gray-600">
                Browse through thousands of job listings across various industries and locations.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Briefcase className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Post Job Openings</h3>
              <p className="text-gray-600">
                Employers can create detailed job listings to attract the best talent for their teams.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Users className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Manage Applications</h3>
              <p className="text-gray-600">
                Streamlined tools for tracking applications, interviews, and hiring processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're looking for your next career move or searching for talent, 
            we have the tools to help you succeed.
          </p>
          
          {!isAuthenticated && <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Create an Account
                </Button>
              </Link>
            </div>}
        </div>
      </section>
    </MainLayout>;
};
export default Index;