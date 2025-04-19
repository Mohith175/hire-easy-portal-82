
import React from "react";
import MainLayout from "@/components/common/MainLayout";
import ApplicationsTracker from "@/components/applications/ApplicationsTracker";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

const MyApplications = () => {
  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-primary to-secondary/70 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">My Applications</h1>
          <p className="text-white/80">
            Track and manage all your job applications
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <ApplicationsTracker />
        
        <div className="mt-8 text-center">
          <Link to="/jobs">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Briefcase className="mr-2 h-5 w-5" />
              Browse More Jobs
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default MyApplications;
