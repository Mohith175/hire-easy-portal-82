import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Upload, FileType, Trash2, FilePlus, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserResumes, uploadResume, deleteResume, Resume } from "@/services/jobService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ResumeUploadProps {
  onSelect?: (resumeId: number) => void;
  selectedResumeId?: number;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onSelect, selectedResumeId }) => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  // Fetch user's resumes
  const { data: resumes, isLoading } = useQuery({
    queryKey: ['userResumes', user?.id],
    queryFn: () => user ? getUserResumes(user.id) : Promise.resolve([]),
    enabled: !!user,
  });

  // Upload resume mutation
  const uploadMutation = useMutation({
    mutationFn: (formData: FormData) => {
      if (!user) throw new Error("User not authenticated");
      return uploadResume(user.id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userResumes', user?.id] });
      setFile(null);
      toast({
        title: "Resume uploaded",
        description: "Your resume has been successfully uploaded.",
      });
    },
    onError: (error) => {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your resume. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete resume mutation
  const deleteMutation = useMutation({
    mutationFn: (resumeId: number) => {
      if (!user) throw new Error("User not authenticated");
      return deleteResume(user.id, resumeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userResumes', user?.id] });
      toast({
        title: "Resume deleted",
        description: "Your resume has been successfully deleted.",
      });
    },
    onError: (error) => {
      console.error("Delete error:", error);
      toast({
        title: "Delete failed",
        description: "There was an error deleting your resume. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file type
      if (!selectedFile.type.includes('pdf') && 
          !selectedFile.type.includes('doc') && 
          !selectedFile.type.includes('docx')) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    
    uploadMutation.mutate(formData);
  };

  const handleDelete = (resumeId: number) => {
    deleteMutation.mutate(resumeId);
  };

  const handleSelect = (resume: Resume) => {
    if (onSelect) {
      onSelect(resume.id);
    }
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) {
      return <FileType className="text-red-500" />;
    } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
      return <FileText className="text-blue-500" />;
    }
    return <FileText className="text-gray-500" />;
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">
            Please log in to upload and manage your resumes.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Management</CardTitle>
        <CardDescription>
          Upload and manage your resumes to apply for jobs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload new resume */}
        <div className="space-y-4">
          <Label htmlFor="resume">Upload New Resume</Label>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-2">
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="flex-1"
              />
              <Button 
                onClick={handleUpload}
                disabled={!file || uploadMutation.isPending}
              >
                {uploadMutation.isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={16} className="mr-2" />
                    Upload
                  </>
                )}
              </Button>
            </div>
            {file && (
              <div className="text-sm text-gray-500">
                Selected file: {file.name}
              </div>
            )}
          </div>
        </div>

        {/* Existing resumes */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Your Resumes</h3>
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin h-6 w-6 rounded-full border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : resumes && resumes.length > 0 ? (
            <ul className="space-y-2">
              {resumes.map((resume) => (
                <li key={resume.id} className={`flex items-center justify-between p-3 rounded-md border ${selectedResumeId === resume.id ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-3">
                    {getFileIcon(resume.fileName)}
                    <div>
                      <p className="font-medium">{resume.fileName}</p>
                      <p className="text-xs text-gray-500">
                        Uploaded on {new Date(resume.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {onSelect && (
                      <Button 
                        variant={selectedResumeId === resume.id ? "default" : "outline"} 
                        size="sm"
                        onClick={() => handleSelect(resume)}
                      >
                        {selectedResumeId === resume.id ? "Selected" : "Select"}
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(resume.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-4 text-center border rounded-md border-dashed">
              <FilePlus className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                No resumes uploaded yet
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeUpload;
