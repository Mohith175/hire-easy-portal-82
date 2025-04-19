
import React, { useState } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Briefcase,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Building,
  MapPin,
  ExternalLink,
  Trash,
  Eye
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";

// Sample applications data
const myApplications = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "TechSolutions Inc.",
    logo: "T",
    location: "New York, NY",
    appliedDate: "2023-05-15",
    status: "pending",
    jobId: 1,
    description: "We're looking for a Senior Frontend Developer with 5+ years of experience in React and modern JavaScript frameworks to join our team."
  },
  {
    id: 2,
    jobTitle: "UX Designer",
    company: "Creative Designs",
    logo: "C",
    location: "San Francisco, CA",
    appliedDate: "2023-05-12",
    status: "reviewing",
    jobId: 2,
    description: "Join our creative team as a UX/UI Designer to create beautiful and intuitive user experiences for our products and clients."
  },
  {
    id: 3,
    jobTitle: "Full Stack Developer",
    company: "Innovate Labs",
    logo: "I",
    location: "Remote",
    appliedDate: "2023-05-10",
    status: "accepted",
    jobId: 3,
    description: "We're seeking a Full Stack Developer proficient in both frontend and backend technologies to help build our next-generation applications."
  },
  {
    id: 4,
    jobTitle: "Product Manager",
    company: "GrowthTech",
    logo: "G",
    location: "Boston, MA",
    appliedDate: "2023-05-08",
    status: "rejected",
    jobId: 4,
    description: "Looking for an experienced Product Manager to lead our product development efforts and work closely with engineering and design teams."
  },
  {
    id: 5,
    jobTitle: "DevOps Engineer",
    company: "CloudNative",
    logo: "C",
    location: "Seattle, WA",
    appliedDate: "2023-05-14",
    status: "pending",
    jobId: 5,
    description: "Join our team as a DevOps Engineer to build and maintain our cloud infrastructure and CI/CD pipelines."
  },
];

const MyApplications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [applicationToWithdraw, setApplicationToWithdraw] = useState<number | null>(null);
  const [applications, setApplications] = useState(myApplications);

  const filteredApplications = applications.filter(application => 
    application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewApplication = (application: any) => {
    setSelectedApplication(application);
    setIsViewDialogOpen(true);
  };

  const handleWithdrawApplication = (id: number) => {
    setApplications(applications.filter(app => app.id !== id));
    setIsWithdrawDialogOpen(false);
    setApplicationToWithdraw(null);
  };

  const openWithdrawDialog = (id: number) => {
    setApplicationToWithdraw(id);
    setIsWithdrawDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Pending</Badge>;
      case "reviewing":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Reviewing</Badge>;
      case "accepted":
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">Accepted</Badge>;
      case "rejected":
        return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock size={20} className="text-blue-600" />;
      case "reviewing":
        return <Clock size={20} className="text-yellow-600" />;
      case "accepted":
        return <CheckCircle size={20} className="text-green-600" />;
      case "rejected":
        return <XCircle size={20} className="text-red-600" />;
      default:
        return <Clock size={20} />;
    }
  };

  const counts = {
    total: applications.length,
    pending: applications.filter(a => a.status === "pending").length,
    reviewing: applications.filter(a => a.status === "reviewing").length,
    accepted: applications.filter(a => a.status === "accepted").length,
    rejected: applications.filter(a => a.status === "rejected").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold">My Applications</h1>
          <div className="relative">
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="all" className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
              All 
              <Badge variant="secondary" className="bg-gray-100">{counts.total}</Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
              Pending
              <Badge variant="secondary" className="bg-blue-100">{counts.pending}</Badge>
            </TabsTrigger>
            <TabsTrigger value="reviewing" className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
              Reviewing
              <Badge variant="secondary" className="bg-yellow-100">{counts.reviewing}</Badge>
            </TabsTrigger>
            <TabsTrigger value="accepted" className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
              Accepted
              <Badge variant="secondary" className="bg-green-100">{counts.accepted}</Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
              Rejected
              <Badge variant="secondary" className="bg-red-100">{counts.rejected}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <ApplicationsList 
              applications={filteredApplications} 
              onViewApplication={handleViewApplication}
              onWithdrawApplication={openWithdrawDialog}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
          
          <TabsContent value="pending">
            <ApplicationsList 
              applications={filteredApplications.filter(a => a.status === "pending")} 
              onViewApplication={handleViewApplication}
              onWithdrawApplication={openWithdrawDialog}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
          
          <TabsContent value="reviewing">
            <ApplicationsList 
              applications={filteredApplications.filter(a => a.status === "reviewing")} 
              onViewApplication={handleViewApplication}
              onWithdrawApplication={openWithdrawDialog}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
          
          <TabsContent value="accepted">
            <ApplicationsList 
              applications={filteredApplications.filter(a => a.status === "accepted")} 
              onViewApplication={handleViewApplication}
              onWithdrawApplication={openWithdrawDialog}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
          
          <TabsContent value="rejected">
            <ApplicationsList 
              applications={filteredApplications.filter(a => a.status === "rejected")} 
              onViewApplication={handleViewApplication}
              onWithdrawApplication={openWithdrawDialog}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
        </Tabs>
        
        {/* Application Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            {selectedApplication && (
              <>
                <DialogHeader>
                  <DialogTitle>Application Details</DialogTitle>
                  <DialogDescription>
                    Applied on {new Date(selectedApplication.appliedDate).toLocaleDateString()}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-4 space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center mr-4">
                      {selectedApplication.logo}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{selectedApplication.jobTitle}</h3>
                      <p className="text-gray-600">{selectedApplication.company}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin size={14} className="mr-1" />
                        {selectedApplication.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4 bg-gray-50">
                    <div className="flex items-center mb-2">
                      <Clock size={18} className="text-primary mr-2" />
                      <h4 className="font-medium">Application Status</h4>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(selectedApplication.status)}
                      <div className="ml-3">
                        <p className="font-medium">
                          {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Updated on {new Date(selectedApplication.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Job Description</h4>
                    <p className="text-gray-700">{selectedApplication.description}</p>
                  </div>
                </div>
                
                <DialogFooter className="flex-col sm:flex-row gap-2">
                  <Link to={`/jobs/${selectedApplication.jobId}`}>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <ExternalLink size={16} className="mr-2" />
                      View Job
                    </Button>
                  </Link>
                  
                  {(selectedApplication.status === "pending" || selectedApplication.status === "reviewing") && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          className="w-full sm:w-auto"
                        >
                          <Trash size={16} className="mr-2" />
                          Withdraw Application
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will withdraw your application for the position of {selectedApplication.jobTitle} at {selectedApplication.company}. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleWithdrawApplication(selectedApplication.id)}
                          >
                            Withdraw
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
        
        {/* Withdraw Application Dialog */}
        <AlertDialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Withdraw Application</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to withdraw this application? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setApplicationToWithdraw(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction 
                className="bg-red-500 hover:bg-red-600"
                onClick={() => applicationToWithdraw && handleWithdrawApplication(applicationToWithdraw)}
              >
                Withdraw
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

const ApplicationsList = ({ 
  applications,
  onViewApplication,
  onWithdrawApplication,
  getStatusBadge
}: { 
  applications: any[],
  onViewApplication: (application: any) => void,
  onWithdrawApplication: (id: number) => void,
  getStatusBadge: (status: string) => React.ReactNode
}) => {
  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="py-8">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-1">No applications found</h3>
            <p className="text-gray-500 mb-4">You haven't applied to any jobs yet.</p>
            <Link to="/jobs">
              <Button>Browse Jobs</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application.id} className="hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center mr-4 mb-4 md:mb-0">
                {application.logo}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-medium">{application.jobTitle}</h3>
                <p className="text-gray-600">{application.company}</p>
                <div className="flex flex-wrap items-center text-sm text-gray-500 mt-1 gap-y-1">
                  <span className="flex items-center mr-4">
                    <MapPin size={14} className="mr-1" />
                    {application.location}
                  </span>
                  <span className="flex items-center mr-4">
                    <Calendar size={14} className="mr-1" />
                    Applied on {new Date(application.appliedDate).toLocaleDateString()}
                  </span>
                  <span>
                    {getStatusBadge(application.status)}
                  </span>
                </div>
              </div>
              <div className="md:ml-4 mt-4 md:mt-0 flex flex-col md:flex-row gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onViewApplication(application)}
                >
                  <Eye size={16} className="mr-2" />
                  View
                </Button>
                
                {(application.status === "pending" || application.status === "reviewing") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onWithdrawApplication(application.id)}
                  >
                    <Trash size={16} className="mr-2" />
                    Withdraw
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyApplications;
