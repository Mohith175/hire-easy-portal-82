import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/common/MainLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Job, getUserJobs, JobApplication, getJobApplications } from "@/services/jobService";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { 
  Briefcase, 
  Search, 
  PlusCircle, 
  MapPin, 
  Users, 
  Calendar,
  Edit,
  Trash2
} from "lucide-react";

const MyJobs = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['userJobs', user?.id],
    queryFn: () => user ? getUserJobs(user.id) : Promise.resolve([]),
    enabled: !!user,
  });
  
  const filteredJobs = React.useMemo(() => {
    if (!jobs) return [];
    
    if (!searchTerm) return jobs;
    
    return jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [jobs, searchTerm]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  if (!user) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="mb-4 text-lg">Please log in to view your posted jobs</p>
              <Button onClick={() => window.location.href = "/login"}>
                Log In
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-primary to-secondary/70 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">My Posted Jobs</h1>
          <p className="text-white/80">
            Manage your job listings and track applicants
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <form onSubmit={handleSearch} className="flex gap-2 flex-grow">
            <div className="relative flex-grow">
              <Input
                placeholder="Search jobs by title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
            <Button type="submit">Search</Button>
          </form>
          
          <Link to="/jobs/post">
            <Button>
              <PlusCircle size={16} className="mr-2" />
              Post New Job
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-8 w-8 rounded-full border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-xl font-medium text-gray-900 mb-2">Error loading your jobs</p>
              <p className="text-gray-500">Please try again later or contact support if the problem persists.</p>
              <Button className="mt-4" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : filteredJobs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Briefcase className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-xl font-medium text-gray-900 mb-2">No jobs found</p>
              <p className="text-gray-500 mb-4">
                {searchTerm ? "No jobs match your search criteria." : "You haven't posted any jobs yet."}
              </p>
              <Link to="/jobs/post">
                <Button>
                  <PlusCircle size={16} className="mr-2" />
                  Post Your First Job
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map(job => (
              <MyJobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

interface MyJobCardProps {
  job: Job;
}

const MyJobCard: React.FC<MyJobCardProps> = ({ job }) => {
  const [showApplications, setShowApplications] = useState(false);
  
  const { data: applications, isLoading: isLoadingApplications } = useQuery({
    queryKey: ['jobApplications', job.id, showApplications],
    queryFn: () => getJobApplications(job.id),
    enabled: showApplications,
  });
  
  const handleDelete = () => {
    toast({
      title: "Job deleted",
      description: "The job has been successfully deleted.",
    });
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>{job.title}</CardTitle>
            <div className="flex items-center text-gray-500 mt-1">
              <MapPin size={14} className="mr-1" />
              <span>{job.city}, {job.country}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/jobs/${job.id}/edit`}>
              <Button variant="outline" size="sm">
                <Edit size={14} className="mr-1" />
                Edit
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={handleDelete}>
              <Trash2 size={14} className="mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge>{job.jobType}</Badge>
          <div className="flex items-center">
            <Users size={14} className="mr-1" />
            <span className="text-sm text-gray-500">
              {applications?.length || 0} applicants
            </span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span className="text-sm text-gray-500">
              Posted recently
            </span>
          </div>
        </div>
        
        <p className="text-gray-700 line-clamp-2 mb-4">{job.jobDescription}</p>
        
        <div className="flex flex-wrap gap-2">
          {job.skills.split(',').slice(0, 5).map((skill, index) => (
            <Badge key={index} variant="outline">{skill.trim()}</Badge>
          ))}
          {job.skills.split(',').length > 5 && (
            <Badge variant="outline">+{job.skills.split(',').length - 5} more</Badge>
          )}
        </div>
        
        {showApplications && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Applications</h3>
            
            {isLoadingApplications ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin h-6 w-6 rounded-full border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : !applications || applications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No applications yet</p>
            ) : (
              <div className="space-y-4">
                {applications.map(application => (
                  <ApplicationRow key={application.id} application={application} />
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setShowApplications(!showApplications)}
        >
          {showApplications ? "Hide Applicants" : "View Applicants"}
        </Button>
        <Link to={`/jobs/${job.id}`}>
          <Button variant="outline">View Job Listing</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

interface ApplicationRowProps {
  application: JobApplication;
}

const ApplicationRow: React.FC<ApplicationRowProps> = ({ application }) => {
  const handleStatusChange = (status: string) => {
    toast({
      title: "Status updated",
      description: `Application status changed to ${status}`,
    });
  };
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-md hover:border-primary transition-colors">
      <div>
        <p className="font-medium">{application.userName || "Applicant Name"}</p>
        <p className="text-sm text-gray-500">
          Applied on {new Date(application.appliedDate).toLocaleDateString()}
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Select 
          defaultValue={application.status} 
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="REVIEWING">Reviewing</SelectItem>
            <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
            <SelectItem value="SELECTED">Selected</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
        
        <Link to={`/applications/${application.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MyJobs;
