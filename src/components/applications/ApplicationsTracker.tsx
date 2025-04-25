import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  JobApplication, 
  ApplicationStatus as StatusType,
  getUserApplications
} from "@/services/jobService";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ApplicationStatus from "./ApplicationStatus";
import { 
  CheckCheck, 
  ClipboardList, 
  Clock, 
  Building, 
  Calendar,
  Briefcase,
  X
} from "lucide-react";

const ApplicationsTracker: React.FC = () => {
  const { user } = useAuth();
  
  const { data: applications } = useQuery({
    queryKey: ['userApplications', user?.id?.toString()],
    queryFn: () => user ? getUserApplications(user.id.toString()) : Promise.resolve([]),
    enabled: !!user,
  });

  const [selectedTab, setSelectedTab] = React.useState("all");
  
  const filteredApplications = React.useMemo(() => {
    if (!applications) return [];
    
    if (selectedTab === "all") {
      return applications;
    }
    
    return applications.filter(app => app.status.toLowerCase() === selectedTab);
  }, [applications, selectedTab]);
  
  const getStatusCount = (status: string): number => {
    if (!applications) return 0;
    return applications.filter(app => 
      status === "all" ? true : app.status.toLowerCase() === status
    ).length;
  };
  
  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-gray-500">
            Please log in to see your job applications.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Job Applications</CardTitle>
        <CardDescription>
          Track the status of all your job applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <ClipboardList size={16} />
              All <Badge variant="outline">{getStatusCount("all")}</Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock size={16} />
              Pending <Badge variant="outline">{getStatusCount("pending")}</Badge>
            </TabsTrigger>
            <TabsTrigger value="reviewing" className="flex items-center gap-2">
              <ClipboardList size={16} />
              Reviewing <Badge variant="outline">{getStatusCount("reviewing")}</Badge>
            </TabsTrigger>
            <TabsTrigger value="selected" className="flex items-center gap-2">
              <CheckCheck size={16} />
              Selected <Badge variant="outline">{getStatusCount("selected")}</Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-2">
              <X size={16} />
              Rejected <Badge variant="outline">{getStatusCount("rejected")}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedTab}>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin h-8 w-8 rounded-full border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500">Error loading your applications</p>
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="text-center py-8 border rounded-md border-dashed">
                <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">No applications found</p>
                <p className="text-gray-500 mb-4">
                  {selectedTab === "all" 
                    ? "You haven't applied to any jobs yet." 
                    : `You don't have any ${selectedTab} applications.`}
                </p>
                <Link to="/jobs" className="text-primary hover:underline">
                  Browse Jobs
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredApplications.map((application) => (
                  <ApplicationItem key={application.id} application={application} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface ApplicationItemProps {
  application: JobApplication;
}

const ApplicationItem: React.FC<ApplicationItemProps> = ({ application }) => {
  return (
    <div className="p-4 border rounded-lg hover:border-primary transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-grow space-y-1">
          <h3 className="font-medium text-lg">
            <Link to={`/jobs/${application.jobId}`} className="hover:text-primary">
              {application.jobTitle || "Job Title"}
            </Link>
          </h3>
          
          <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Building size={14} className="mr-1" />
              <span>Company Name</span>
            </div>
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>Applied on {new Date(application.appliedDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <ApplicationStatus status={application.status} showProgress />
      </div>
      
      {application.feedback && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm font-medium mb-1">Feedback:</p>
          <p className="text-sm text-gray-600">{application.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationsTracker;
