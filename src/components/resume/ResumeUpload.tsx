import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { FileUp, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Resume, uploadResume, getUserResumes, deleteResume } from "@/services/jobService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ResumeUploadProps {
  onSelect: (resumeId: string | undefined) => void;
  selectedResumeId?: string;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onSelect, selectedResumeId }) => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const queryClient = useQueryClient();
  
  const { data: resumes, isLoading } = useQuery({
    queryKey: ['userResumes', user?.id?.toString()],
    queryFn: () => user ? getUserResumes(user.id.toString()) : Promise.resolve([]),
    enabled: !!user,
  });
  
  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!user || !file) return null;
      return uploadResume(user.id.toString(), file);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userResumes', user?.id?.toString()] });
      if (data) {
        onSelect(data.id);
        toast({
          title: "Resume uploaded",
          description: "Your resume has been uploaded successfully.",
        });
      }
      setFile(null);
    },
    onError: (error) => {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your resume. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: (resumeId: string) => {
      return deleteResume(resumeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userResumes', user?.id?.toString()] });
      if (selectedResumeId) {
        onSelect(undefined);
      }
      toast({
        title: "Resume deleted",
        description: "Your resume has been deleted successfully.",
      });
    },
    onError: (error) => {
      console.error("Delete error:", error);
      toast({
        title: "Delete failed",
        description: "There was an error deleting your resume. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }
    
    uploadMutation.mutate();
  };
  
  const handleDelete = (resumeId: string) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      deleteMutation.mutate(resumeId);
    }
  };
  
  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-gray-500">
            Please log in to upload and manage your resumes.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload New Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="resume">Resume</Label>
              <div className="flex items-center gap-2">
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label
                  htmlFor="resume"
                  className="cursor-pointer py-2 px-4 border border-dashed rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors w-full"
                >
                  <FileUp size={16} />
                  {file ? file.name : "Select your resume file"}
                </Label>
                {file && (
                  <Button onClick={handleUpload} disabled={uploadMutation.isPending}>
                    {uploadMutation.isPending ? "Uploading..." : "Upload"}
                  </Button>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Accepted formats: PDF, DOC, DOCX
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Resumes</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin h-6 w-6 rounded-full border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : resumes && resumes.length > 0 ? (
            <div className="space-y-4">
              {resumes.map((resume) => (
                <div 
                  key={resume.id}
                  className={`p-4 border rounded-md ${
                    selectedResumeId === resume.id ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{resume.file_name || resume.fileName}</p>
                      <p className="text-sm text-gray-500">
                        Uploaded {new Date(resume.uploaded_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onSelect(resume.id)}
                      >
                        {selectedResumeId === resume.id ? "Selected" : "Select"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(resume.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                You haven't uploaded any resumes yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeUpload;
