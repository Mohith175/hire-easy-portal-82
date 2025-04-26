
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { getEmployerApplications, JobApplication } from "@/services/jobService";
import { getEmployerJobs, Job } from "@/services/jobService";
import { scheduleInterview, rejectApplication } from "@/services/interviewService";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import ApplicationStatus from "@/components/applications/ApplicationStatus";
import { handleError } from "@/services/errorService";
import { apiRequest } from "@/services/api";

const EmployerApplications = () => {
  const { user } = useAuth();
  const userId = user?.id?.toString();
  
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [interviewDate, setInterviewDate] = useState<string>("");
  const [interviewTime, setInterviewTime] = useState<string>("12:00");
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  // Fetch all jobs posted by the employer
  const { data: jobs } = useQuery({
    queryKey: ["employerJobs", userId],
    queryFn: () => userId ? getEmployerJobs(userId) : Promise.resolve([]),
    enabled: !!userId,
  });
  
  // Fetch all applications for the employer's jobs
  const { data: applications, isLoading, refetch } = useQuery({
    queryKey: ["employerApplications", userId],
    queryFn: () => userId ? getEmployerApplications(userId) : Promise.resolve([]),
    enabled: !!userId,
  });

  // Handle scheduling an interview
  const handleScheduleInterview = async () => {
    if (!userId || !selectedApplication || !interviewDate || !interviewTime) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }

    const scheduledTime = `${interviewDate}T${interviewTime}:00`;

    try {
      await scheduleInterview(userId, selectedApplication.id, {
        applicantId: selectedApplication.userId,
        scheduledTime,
      });
      
      toast({
        title: "Interview scheduled",
        description: "The candidate will be notified via email",
      });
      
      // Refresh applications list
      refetch();
      
      // Reset form
      setSelectedApplication(null);
      setInterviewDate("");
      setInterviewTime("12:00");
      
    } catch (error) {
      handleError(error);
    }
  };

  // Handle rejecting an application
  const handleRejectApplication = async () => {
    if (!userId || !selectedApplication) {
      toast({
        title: "Error",
        description: "Cannot process the rejection",
        variant: "destructive",
      });
      return;
    }

    try {
      await rejectApplication(userId, selectedApplication.id, feedback);
      
      toast({
        title: "Application rejected",
        description: "The candidate will be notified of your decision",
      });
      
      // Refresh applications list
      refetch();
      
      // Reset form
      setSelectedApplication(null);
      setFeedback("");
      setIsRejectDialogOpen(false);
      
    } catch (error) {
      handleError(error);
    }
  };

  // Filter applications based on selected job and search term
  const filteredApplications = applications?.filter(app => {
    const matchesJob = selectedJobId ? app.jobId === selectedJobId : true;
    const matchesStatus = statusFilter !== "all" ? app.status === statusFilter : true;
    const matchesSearch = searchTerm 
      ? (app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
      : true;
    
    return matchesJob && matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Job Applications</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Applications Overview</CardTitle>
            <CardDescription>
              Review and manage applications for your job postings
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Label htmlFor="job-filter">Filter by Job</Label>
                <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                  <SelectTrigger id="job-filter">
                    <SelectValue placeholder="All Jobs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Jobs</SelectItem>
                    {jobs?.map(job => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Label htmlFor="status-filter">Filter by Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewing">Reviewing</SelectItem>
                    <SelectItem value="selected">Selected</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search by job title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Application Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Applications</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="reviewing">Reviewing</TabsTrigger>
                <TabsTrigger value="selected">Selected</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                  </div>
                ) : filteredApplications?.length ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Job Title</TableHead>
                          <TableHead>Applicant</TableHead>
                          <TableHead>Applied Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredApplications.map((application) => (
                          <TableRow key={application.id}>
                            <TableCell className="font-medium">{application.jobTitle}</TableCell>
                            <TableCell>{application.userId}</TableCell>
                            <TableCell>{format(new Date(application.appliedDate), "MMM d, yyyy")}</TableCell>
                            <TableCell>
                              <ApplicationStatus status={application.status} />
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => setSelectedApplication(application)}
                                    >
                                      View
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Application Details</DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4">
                                      <div className="space-y-4">
                                        <div>
                                          <h3 className="font-semibold">Job</h3>
                                          <p>{application.jobTitle}</p>
                                        </div>
                                        <div>
                                          <h3 className="font-semibold">Status</h3>
                                          <ApplicationStatus status={application.status} />
                                        </div>
                                        <div>
                                          <h3 className="font-semibold">Applied On</h3>
                                          <p>{format(new Date(application.appliedDate), "PPP")}</p>
                                        </div>
                                        {application.feedback && (
                                          <div>
                                            <h3 className="font-semibold">Feedback</h3>
                                            <p>{application.feedback}</p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>

                                {application.status !== "rejected" && (
                                  <>
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button 
                                          variant="default" 
                                          size="sm"
                                          onClick={() => setSelectedApplication(application)}
                                        >
                                          Schedule Interview
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                          <DialogTitle>Schedule Interview</DialogTitle>
                                          <DialogDescription>
                                            Set a date and time for the interview. The candidate will be notified via email.
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="interview-date" className="text-right">
                                              Date
                                            </Label>
                                            <Input
                                              id="interview-date"
                                              type="date"
                                              className="col-span-3"
                                              value={interviewDate}
                                              onChange={(e) => setInterviewDate(e.target.value)}
                                              min={format(new Date(), "yyyy-MM-dd")}
                                            />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="interview-time" className="text-right">
                                              Time
                                            </Label>
                                            <Input
                                              id="interview-time"
                                              type="time"
                                              className="col-span-3"
                                              value={interviewTime}
                                              onChange={(e) => setInterviewTime(e.target.value)}
                                            />
                                          </div>
                                        </div>
                                        <DialogFooter>
                                          <Button type="submit" onClick={handleScheduleInterview}>
                                            Schedule and Notify
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                    
                                    <Dialog open={isRejectDialogOpen && selectedApplication?.id === application.id} onOpenChange={(open) => {
                                      if (!open) setIsRejectDialogOpen(false);
                                    }}>
                                      <DialogTrigger asChild>
                                        <Button 
                                          variant="destructive" 
                                          size="sm"
                                          onClick={() => {
                                            setSelectedApplication(application);
                                            setIsRejectDialogOpen(true);
                                          }}
                                        >
                                          Reject
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                          <DialogTitle>Reject Application</DialogTitle>
                                          <DialogDescription>
                                            Provide feedback to the applicant (optional). They will be notified of your decision.
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                          <Label htmlFor="feedback" className="mb-2 block">
                                            Feedback (optional)
                                          </Label>
                                          <Textarea
                                            id="feedback"
                                            placeholder="Provide feedback to the candidate..."
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            rows={4}
                                          />
                                        </div>
                                        <DialogFooter>
                                          <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                                            Cancel
                                          </Button>
                                          <Button variant="destructive" onClick={handleRejectApplication}>
                                            Reject Application
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </>
                                )}
                                
                                {application.status !== "rejected" && (
                                  <Select
                                    onValueChange={(value) => {
                                      // Update application status
                                      if (userId) {
                                        apiRequest(`/employers/${userId}/myApplications/${application.id}`, {
                                          method: 'POST',
                                          body: { status: value }
                                        }).then(() => {
                                          toast({
                                            title: "Status updated",
                                            description: `Application status updated to ${value}`
                                          });
                                          refetch();
                                        }).catch(handleError);
                                      }
                                    }}
                                    defaultValue={application.status}
                                  >
                                    <SelectTrigger className="w-[120px] h-8">
                                      <SelectValue placeholder="Change Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="reviewing">Reviewing</SelectItem>
                                      <SelectItem value="selected">Selected</SelectItem>
                                      <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No applications found.</p>
                  </div>
                )}
              </TabsContent>

              {/* Other tabs would have filtered content based on status */}
              <TabsContent value="pending" className="space-y-4">
                {/* Same table but filtered for pending status */}
              </TabsContent>
              <TabsContent value="reviewing" className="space-y-4">
                {/* Same table but filtered for reviewing status */}
              </TabsContent>
              <TabsContent value="selected" className="space-y-4">
                {/* Same table but filtered for selected status */}
              </TabsContent>
              <TabsContent value="rejected" className="space-y-4">
                {/* Same table but filtered for rejected status */}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EmployerApplications;
