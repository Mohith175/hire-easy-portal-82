
import React, { useState } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  User,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Mail,
  Phone,
  Download,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Sample applications data
const applications = [
  {
    id: 1,
    applicantName: "John Smith",
    jobTitle: "Senior Frontend Developer",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    status: "pending",
    appliedDate: "2023-05-15",
    resumeUrl: "#",
    coverLetter: "I am writing to express my interest in the Senior Frontend Developer position. With over 5 years of experience in building responsive web applications using React and modern JavaScript, I believe I would be a great fit for your team.",
    education: "Bachelor of Science in Computer Science, Stanford University",
    experience: "5+ years of frontend development experience",
    location: "New York, NY",
    skills: ["React", "TypeScript", "CSS", "Redux", "Jest"],
  },
  {
    id: 2,
    applicantName: "Emily Johnson",
    jobTitle: "UX Designer",
    email: "emily.johnson@example.com",
    phone: "+1 (555) 234-5678",
    status: "reviewing",
    appliedDate: "2023-05-12",
    resumeUrl: "#",
    coverLetter: "I'm excited to apply for the UX Designer position at your company. With my background in user-centered design and experience with design tools like Figma and Sketch, I can help create intuitive and engaging user experiences.",
    education: "Master of Fine Arts in Design, Rhode Island School of Design",
    experience: "3+ years as a UX Designer",
    location: "Boston, MA",
    skills: ["Figma", "User Research", "Wireframing", "Prototyping", "UI Design"],
  },
  {
    id: 3,
    applicantName: "Michael Brown",
    jobTitle: "Full Stack Developer",
    email: "michael.brown@example.com",
    phone: "+1 (555) 345-6789",
    status: "accepted",
    appliedDate: "2023-05-10",
    resumeUrl: "#",
    coverLetter: "I am applying for the Full Stack Developer position advertised on your website. With my extensive experience in both frontend and backend technologies, I am confident in my ability to contribute to your development team.",
    education: "Bachelor of Engineering in Software Engineering, MIT",
    experience: "4+ years as a Full Stack Developer",
    location: "San Francisco, CA",
    skills: ["JavaScript", "Node.js", "React", "MongoDB", "Express"],
  },
  {
    id: 4,
    applicantName: "Sarah Davis",
    jobTitle: "Product Manager",
    email: "sarah.davis@example.com",
    phone: "+1 (555) 456-7890",
    status: "rejected",
    appliedDate: "2023-05-08",
    resumeUrl: "#",
    coverLetter: "I'm writing to apply for the Product Manager position. With my background in product development and experience in agile methodologies, I can help drive the success of your products.",
    education: "MBA, Harvard Business School",
    experience: "6+ years in Product Management",
    location: "Chicago, IL",
    skills: ["Product Strategy", "Agile", "User Stories", "Market Research", "Data Analysis"],
  },
  {
    id: 5,
    applicantName: "David Wilson",
    jobTitle: "DevOps Engineer",
    email: "david.wilson@example.com",
    phone: "+1 (555) 567-8901",
    status: "pending",
    appliedDate: "2023-05-14",
    resumeUrl: "#",
    coverLetter: "I am interested in the DevOps Engineer position at your company. With my experience in cloud infrastructure and CI/CD pipelines, I can help improve your development and deployment processes.",
    education: "Bachelor of Science in Computer Engineering, Georgia Tech",
    experience: "3+ years in DevOps",
    location: "Austin, TX",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
  },
];

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredApplications = applications.filter(application => {
    const matchesSearch = 
      application.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? application.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewApplication = (application: any) => {
    setSelectedApplication(application);
    setIsViewDialogOpen(true);
  };

  const handleUpdateStatus = (applicationId: number, newStatus: string) => {
    // In a real app, this would send an API request
    
    toast({
      title: "Application status updated",
      description: `The application status has been changed to ${newStatus}.`,
    });
    
    if (selectedApplication?.id === applicationId) {
      setSelectedApplication({
        ...selectedApplication,
        status: newStatus
      });
    }
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
          <h1 className="text-3xl font-bold">Applications</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} className="mr-2" />
              Filters
              {statusFilter && <Badge variant="secondary" className="ml-2">1</Badge>}
            </Button>
          </div>
        </div>

        {showFilters && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <div className="space-y-2 flex-grow">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={statusFilter || ""}
                    onValueChange={(value) => setStatusFilter(value || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewing">Reviewing</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="self-end">
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setStatusFilter(null);
                      setSearchTerm("");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
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
              onUpdateStatus={handleUpdateStatus}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
          
          <TabsContent value="pending">
            <ApplicationsList 
              applications={filteredApplications.filter(a => a.status === "pending")} 
              onViewApplication={handleViewApplication}
              onUpdateStatus={handleUpdateStatus}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
          
          <TabsContent value="reviewing">
            <ApplicationsList 
              applications={filteredApplications.filter(a => a.status === "reviewing")} 
              onViewApplication={handleViewApplication}
              onUpdateStatus={handleUpdateStatus}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
          
          <TabsContent value="accepted">
            <ApplicationsList 
              applications={filteredApplications.filter(a => a.status === "accepted")} 
              onViewApplication={handleViewApplication}
              onUpdateStatus={handleUpdateStatus}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
          
          <TabsContent value="rejected">
            <ApplicationsList 
              applications={filteredApplications.filter(a => a.status === "rejected")} 
              onViewApplication={handleViewApplication}
              onUpdateStatus={handleUpdateStatus}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
        </Tabs>
        
        {/* Application Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedApplication && (
              <>
                <DialogHeader>
                  <DialogTitle>Application Details</DialogTitle>
                  <DialogDescription>
                    Applied for {selectedApplication.jobTitle} on {new Date(selectedApplication.appliedDate).toLocaleDateString()}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-4">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Cover Letter</h3>
                      <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                        {selectedApplication.coverLetter}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplication.skills.map((skill: string) => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-4">Applicant Information</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <User size={18} className="text-primary mr-2 mt-0.5" />
                          <div>
                            <div className="font-medium">{selectedApplication.applicantName}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Mail size={18} className="text-primary mr-2 mt-0.5" />
                          <div>
                            <a href={`mailto:${selectedApplication.email}`} className="text-primary hover:underline">
                              {selectedApplication.email}
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Phone size={18} className="text-primary mr-2 mt-0.5" />
                          <div>
                            <a href={`tel:${selectedApplication.phone}`} className="text-primary hover:underline">
                              {selectedApplication.phone}
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Calendar size={18} className="text-primary mr-2 mt-0.5" />
                          <div>
                            <div className="text-gray-700">Applied on {new Date(selectedApplication.appliedDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Status</h3>
                      <div className="flex flex-col space-y-3">
                        <div>
                          Current status: {getStatusBadge(selectedApplication.status)}
                        </div>
                        
                        <Select
                          value={selectedApplication.status}
                          onValueChange={(value) => handleUpdateStatus(selectedApplication.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Update status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="reviewing">Reviewing</SelectItem>
                            <SelectItem value="accepted">Accepted</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Resume</h3>
                      <Button variant="outline" className="w-full">
                        <Download size={16} className="mr-2" />
                        Download Resume
                      </Button>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

const ApplicationsList = ({ 
  applications,
  onViewApplication,
  onUpdateStatus,
  getStatusBadge
}: { 
  applications: any[],
  onViewApplication: (application: any) => void,
  onUpdateStatus: (id: number, status: string) => void,
  getStatusBadge: (status: string) => React.ReactNode
}) => {
  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-1">No applications found</h3>
            <p className="text-gray-500">There are no applications matching your criteria.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 text-sm font-medium text-gray-500">Applicant</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">Job Title</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500 hidden md:table-cell">Applied Date</th>
                <th className="text-left p-4 text-sm font-medium text-gray-500 hidden md:table-cell">Status</th>
                <th className="text-right p-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium">{application.applicantName}</div>
                    <div className="text-sm text-gray-500">{application.email}</div>
                  </td>
                  <td className="p-4">{application.jobTitle}</td>
                  <td className="p-4 hidden md:table-cell">{new Date(application.appliedDate).toLocaleDateString()}</td>
                  <td className="p-4 hidden md:table-cell">
                    {getStatusBadge(application.status)}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewApplication(application)}
                      >
                        <Eye size={16} className="mr-2" />
                        View
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            className="flex items-center"
                            onClick={() => onUpdateStatus(application.id, "reviewing")}
                          >
                            <Clock size={16} className="mr-2 text-yellow-600" />
                            <span>Mark as Reviewing</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center"
                            onClick={() => onUpdateStatus(application.id, "accepted")}
                          >
                            <CheckCircle size={16} className="mr-2 text-green-600" />
                            <span>Accept Application</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center text-red-600"
                            onClick={() => onUpdateStatus(application.id, "rejected")}
                          >
                            <XCircle size={16} className="mr-2" />
                            <span>Reject Application</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Applications;
