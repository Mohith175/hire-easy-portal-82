import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/common/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { ApplicationStatus, JobApplication, getEmployerApplications, updateApplicationStatus } from "@/services/jobService";

export default function Applications() {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ['employerApplications', user?.id?.toString()],
    queryFn: () => user ? getEmployerApplications(user.id.toString()) : Promise.resolve([]),
    enabled: !!user,
  });

  const handleStatusChange = async (applicationId: string, newStatus: ApplicationStatus) => {
    try {
      if (user) {
        await updateApplicationStatus(
          user.id.toString(), 
          applicationId, 
          newStatus,
          feedback[applicationId]
        );
        
        toast({
          title: "Status updated",
          description: `Application status changed to ${newStatus}`,
        });
        
        refetch();
      }
    } catch (error) {
      console.error("Failed to update application status:", error);
      toast({
        title: "Update failed",
        description: "Could not update the application status",
        variant: "destructive",
      });
    }
  };

  const handleFeedbackChange = (applicationId: string, value: string) => {
    setFeedback(prev => ({
      ...prev,
      [applicationId]: value
    }));
  };

  const getApplicationsByStatus = (status: ApplicationStatus) => {
    return applications.filter(app => app.status === status);
  };

  const getEmployeeName = (application: JobApplication) => {
    return application.employeeId_FK || "Applicant";
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Job Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" className="space-y-4">
              <TabsList>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="reviewing">Reviewing</TabsTrigger>
                <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
                <TabsTrigger value="selected">Selected</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              <TabsContent value="pending" className="space-y-2">
                {getApplicationsByStatus("pending").map((application) => (
                  <Card key={application.id} className="border">
                    <CardContent className="grid gap-4">
                      <div className="font-medium">
                        {application.jobTitle} - {getEmployeeName(application)}
                      </div>
                      <Textarea
                        placeholder="Add feedback..."
                        value={feedback[application.id] || ""}
                        onChange={(e) => handleFeedbackChange(application.id, e.target.value)}
                        className="resize-none"
                      />
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" onClick={() => handleStatusChange(application.id, "reviewing")}>
                          Review
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleStatusChange(application.id, "rejected")}>
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="reviewing" className="space-y-2">
                {getApplicationsByStatus("reviewing").map((application) => (
                  <Card key={application.id} className="border">
                    <CardContent className="grid gap-4">
                      <div className="font-medium">
                        {application.jobTitle} - {getEmployeeName(application)}
                      </div>
                      <Textarea
                        placeholder="Add feedback..."
                        value={feedback[application.id] || ""}
                        onChange={(e) => handleFeedbackChange(application.id, e.target.value)}
                        className="resize-none"
                      />
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" onClick={() => handleStatusChange(application.id, "shortlisted")}>
                          Shortlist
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleStatusChange(application.id, "rejected")}>
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="shortlisted" className="space-y-2">
                {getApplicationsByStatus("shortlisted").map((application) => (
                  <Card key={application.id} className="border">
                    <CardContent className="grid gap-4">
                      <div className="font-medium">
                        {application.jobTitle} - {getEmployeeName(application)}
                      </div>
                      <Textarea
                        placeholder="Add feedback..."
                        value={feedback[application.id] || ""}
                        onChange={(e) => handleFeedbackChange(application.id, e.target.value)}
                        className="resize-none"
                      />
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" onClick={() => handleStatusChange(application.id, "selected")}>
                          Select
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleStatusChange(application.id, "rejected")}>
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="selected" className="space-y-2">
                {getApplicationsByStatus("selected").map((application) => (
                  <Card key={application.id} className="border">
                    <CardContent className="grid gap-4">
                      <div className="font-medium">
                        {application.jobTitle} - {getEmployeeName(application)}
                      </div>
                      <Textarea
                        placeholder="Add feedback..."
                        value={feedback[application.id] || ""}
                        onChange={(e) => handleFeedbackChange(application.id, e.target.value)}
                        className="resize-none"
                      />
                      <div className="flex justify-end space-x-2">
                        <Badge variant="outline">Hired</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="rejected" className="space-y-2">
                {getApplicationsByStatus("rejected").map((application) => (
                  <Card key={application.id} className="border">
                    <CardContent className="grid gap-4">
                      <div className="font-medium">
                        {application.jobTitle} - {getEmployeeName(application)}
                      </div>
                      <Textarea
                        placeholder="Add feedback..."
                        value={feedback[application.id] || ""}
                        onChange={(e) => handleFeedbackChange(application.id, e.target.value)}
                        className="resize-none"
                      />
                      <div className="flex justify-end space-x-2">
                        <Badge variant="destructive">Rejected</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
