
import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  CheckCircle, 
  Clock, 
  FileText, 
  Search,
  MapPin,
  Building,
  CalendarDays,
  ArrowRight,
  Star,
  StarHalf
} from "lucide-react";

// Sample applications data
const applications = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    company: "TechSolutions Inc.",
    logo: "T",
    date: "Applied 3 days ago",
    status: "reviewing",
  },
  {
    id: 2,
    jobTitle: "UX Designer",
    company: "Creative Designs",
    logo: "C",
    date: "Applied 1 week ago",
    status: "accepted",
  },
  {
    id: 3,
    jobTitle: "Product Manager",
    company: "Innovate Labs",
    logo: "I",
    date: "Applied 2 weeks ago",
    status: "rejected",
  },
];

// Recommended jobs data
const recommendedJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechSolutions Inc.",
    logo: "T",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110K - $130K",
    posted: "2 days ago",
    matchScore: 95,
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "Innovate Labs",
    logo: "I",
    location: "Remote",
    type: "Full-time",
    salary: "$100K - $120K",
    posted: "1 week ago",
    matchScore: 85,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Designs",
    logo: "C",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$90K - $110K",
    posted: "3 days ago",
    matchScore: 80,
  },
];

const EmployeeDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold">Job Seeker Dashboard</h1>
          <div className="relative w-full md:w-auto">
            <Input
              className="pl-10 pr-4 py-2 w-full md:w-80"
              placeholder="Search for jobs..."
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="flex items-center pt-6">
              <div className="p-2 rounded-full bg-blue-100 mr-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Applied Jobs</p>
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-xs text-gray-500">Last 30 days</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="flex items-center pt-6">
              <div className="p-2 rounded-full bg-yellow-100 mr-4">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Under Review</p>
                <h3 className="text-2xl font-bold">5</h3>
                <p className="text-xs text-gray-500">Current applications</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="flex items-center pt-6">
              <div className="p-2 rounded-full bg-green-100 mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Accepted</p>
                <h3 className="text-2xl font-bold">2</h3>
                <p className="text-xs text-green-500">2 interview invites</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="flex items-center pt-6">
              <div className="p-2 rounded-full bg-indigo-100 mr-4">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Saved Jobs</p>
                <h3 className="text-2xl font-bold">8</h3>
                <p className="text-xs text-gray-500">For future reference</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Profile Completion */}
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>
              A complete profile increases your chances of getting hired by 75%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "65%" }}></div>
              </div>
              <p className="text-sm text-gray-600">Your profile is 65% complete</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start border rounded-lg p-4">
                  <div className="p-2 rounded-full bg-green-100 mr-3">
                    <CheckCircle size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Basic Information</h3>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                </div>
                
                <div className="flex items-start border rounded-lg p-4">
                  <div className="p-2 rounded-full bg-green-100 mr-3">
                    <CheckCircle size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Contact Information</h3>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                </div>
                
                <div className="flex items-start border rounded-lg p-4">
                  <div className="p-2 rounded-full bg-yellow-100 mr-3">
                    <StarHalf size={16} className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Skills & Experience</h3>
                    <p className="text-sm text-gray-600">Partially completed</p>
                  </div>
                </div>
                
                <div className="flex items-start border rounded-lg p-4">
                  <div className="p-2 rounded-full bg-red-100 mr-3">
                    <Star size={16} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Education & Certifications</h3>
                    <p className="text-sm text-gray-600">Not started</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/employee/profile">
              <Button>
                Complete Your Profile
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Applications</CardTitle>
              <Link to="/employee/applications">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((application) => (
                <div key={application.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4">
                      {application.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{application.jobTitle}</h3>
                      <div className="text-sm text-gray-600">{application.company}</div>
                      <div className="text-xs text-gray-500 mt-1">{application.date}</div>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${application.status === 'reviewing' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${application.status === 'accepted' ? 'bg-green-100 text-green-800' : ''}
                        ${application.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                        ${application.status === 'pending' ? 'bg-blue-100 text-blue-800' : ''}
                      `}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recommended Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>
              Based on your profile and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4">
                      {job.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{job.title}</h3>
                        <Badge variant="secondary" className="ml-2">
                          {job.matchScore}% Match
                        </Badge>
                      </div>
                      <div className="text-sm">{job.company}</div>
                      <div className="flex items-center text-xs text-gray-500 mt-2 flex-wrap gap-y-1">
                        <span className="flex items-center mr-3">
                          <MapPin size={12} className="mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center mr-3">
                          <Briefcase size={12} className="mr-1" />
                          {job.type}
                        </span>
                        <span className="flex items-center mr-3">
                          <Building size={12} className="mr-1" />
                          {job.salary}
                        </span>
                        <span className="flex items-center">
                          <CalendarDays size={12} className="mr-1" />
                          {job.posted}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link to={`/jobs/${job.id}`}>
                      <Button size="sm">
                        View Details <ArrowRight size={14} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-center border-t pt-6">
            <Link to="/jobs">
              <Button variant="outline">
                Browse All Jobs
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
