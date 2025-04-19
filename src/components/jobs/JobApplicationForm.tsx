
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle, Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Resume, applyForJob } from "@/services/jobService";
import { getUserResumes } from "@/services/jobService";
import { useQuery, useMutation } from "@tanstack/react-query";
import ResumeUpload from "@/components/resume/ResumeUpload";

interface JobApplicationFormProps {
  jobId: number;
  jobTitle: string;
  onSuccess?: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobId, jobTitle, onSuccess }) => {
  const { user } = useAuth();
  const [coverLetter, setCoverLetter] = useState("");
  const [selectedResumeId, setSelectedResumeId] = useState<number | undefined>();
  const [showResumeUpload, setShowResumeUpload] = useState(false);

  const { data: resumes } = useQuery({
    queryKey: ['userResumes', user?.id],
    queryFn: () => user ? getUserResumes(user.id) : Promise.resolve([]),
    enabled: !!user,
  });

  const applyMutation = useMutation({
    mutationFn: () => {
      if (!user) throw new Error("User not authenticated");
      if (!selectedResumeId) throw new Error("Please select a resume");
      
      return applyForJob(user.id, jobId, selectedResumeId);
    },
    onSuccess: () => {
      toast({
        title: "Application submitted",
        description: `You have successfully applied for ${jobTitle}`,
      });
      setCoverLetter("");
      setSelectedResumeId(undefined);
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      console.error("Application error:", error);
      toast({
        title: "Application failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleApply = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to apply for this job",
        variant: "destructive",
      });
      return;
    }

    if (!selectedResumeId) {
      toast({
        title: "Resume required",
        description: "Please select or upload a resume to apply",
        variant: "destructive",
      });
      return;
    }

    applyMutation.mutate();
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-amber-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Sign in to apply</h3>
          <p className="text-gray-500 mb-4">
            You need to be logged in to apply for this job.
          </p>
          <Button onClick={() => window.location.href = "/login"}>
            Sign In
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply for {jobTitle}</CardTitle>
        <CardDescription>
          Submit your application for this position
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showResumeUpload ? (
          <>
            <ResumeUpload 
              onSelect={setSelectedResumeId} 
              selectedResumeId={selectedResumeId}
            />
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => setShowResumeUpload(false)}
              >
                Back to Application
              </Button>
            </div>
          </>
        ) : (
          <>
            <div>
              <h3 className="text-sm font-medium mb-2">Resume</h3>
              
              {resumes && resumes.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-2">
                    {resumes.map((resume) => (
                      <div 
                        key={resume.id}
                        className={`p-3 border rounded-md cursor-pointer ${
                          selectedResumeId === resume.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedResumeId(resume.id)}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                            checked={selectedResumeId === resume.id}
                            onChange={() => setSelectedResumeId(resume.id)}
                          />
                          <label className="ml-2 block text-sm text-gray-900">
                            {resume.fileName}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowResumeUpload(true)}
                  >
                    Manage Resumes
                  </Button>
                </div>
              ) : (
                <div className="text-center p-4 border rounded-md border-dashed">
                  <p className="text-gray-500 mb-4">
                    You need to upload a resume to apply for this job
                  </p>
                  <Button onClick={() => setShowResumeUpload(true)}>
                    Upload Resume
                  </Button>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Cover Letter (Optional)</h3>
              <Textarea
                placeholder="Tell us why you're interested in this position and why you're a good fit..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={5}
              />
            </div>
          </>
        )}
      </CardContent>
      {!showResumeUpload && (
        <CardFooter>
          <Button 
            className="w-full"
            onClick={handleApply}
            disabled={!selectedResumeId || applyMutation.isPending}
          >
            {applyMutation.isPending ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting Application...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Application
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default JobApplicationForm;
