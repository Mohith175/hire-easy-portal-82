
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/common/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { createJob, getJobCategories, JobCategory } from "@/services/jobService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Buildings, MapPin, BadgeDollarSign, Trophy, Bookmark } from "lucide-react";

const PostJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    jobDescription: "",
    skills: "",
    jobType: "Full-time",
    salaryRange: "",
    experience: "",
    street: "",
    city: "",
    pinCode: "",
    country: "",
    jobcategoryId: 0,
  });
  
  // Fetch job categories
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['jobCategories'],
    queryFn: getJobCategories
  });
  
  // Create job mutation
  const createJobMutation = useMutation({
    mutationFn: () => {
      if (!user) throw new Error("User not authenticated");
      
      return createJob({
        ...formData,
        employerId: user.id, // In our simplified model, user.id is used as employerId
        logoPath: "" // This could be enhanced with logo upload
      });
    },
    onSuccess: () => {
      toast({
        title: "Job posted successfully",
        description: "Your job has been posted and is now visible to job seekers.",
      });
      navigate("/jobs");
    },
    onError: (error) => {
      console.error("Job posting error:", error);
      toast({
        title: "Failed to post job",
        description: "There was an error posting your job. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, jobcategoryId: parseInt(value) }));
  };
  
  const handleJobTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, jobType: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.companyName || !formData.jobDescription || !formData.jobcategoryId) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    createJobMutation.mutate();
  };
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to post a job.",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [user, navigate]);
  
  if (!user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-primary to-secondary/70 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Post a New Job</h1>
          <p className="text-white/80">
            Create a job listing to find the perfect candidate for your position
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Fill in the information below to create your job listing
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <div className="relative">
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Senior Software Engineer"
                        required
                        className="pl-9"
                      />
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <div className="relative">
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="e.g., Acme Corporation"
                        required
                        className="pl-9"
                      />
                      <Buildings className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobcategoryId">Job Category *</Label>
                  <Select
                    value={formData.jobcategoryId ? formData.jobcategoryId.toString() : ""}
                    onValueChange={handleCategoryChange}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <div className="flex items-center">
                        <Bookmark size={16} className="mr-2 text-gray-500" />
                        <SelectValue placeholder="Select a category" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {isCategoriesLoading ? (
                        <SelectItem value="">Loading categories...</SelectItem>
                      ) : categories && categories.length > 0 ? (
                        categories.map((category: JobCategory) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.title}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="">No categories available</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Job Description *</Label>
                  <Textarea
                    id="jobDescription"
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    placeholder="Describe the responsibilities, requirements, and benefits of the position..."
                    required
                    rows={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills *</Label>
                  <Input
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g., React, Node.js, TypeScript, SQL (comma-separated)"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Separate skills with commas
                  </p>
                </div>
              </div>
              
              {/* Job Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Job Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobType">Job Type *</Label>
                    <Select
                      value={formData.jobType}
                      onValueChange={handleJobTypeChange}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level *</Label>
                    <div className="relative">
                      <Input
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="e.g., 2-4 years"
                        required
                        className="pl-9"
                      />
                      <Trophy className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="salaryRange">Salary Range *</Label>
                  <div className="relative">
                    <Input
                      id="salaryRange"
                      name="salaryRange"
                      value={formData.salaryRange}
                      onChange={handleChange}
                      placeholder="e.g., $80,000 - $120,000 per year"
                      required
                      className="pl-9"
                    />
                    <BadgeDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                  </div>
                </div>
              </div>
              
              {/* Location Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Location Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="e.g., United States"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <div className="relative">
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g., San Francisco"
                        required
                        className="pl-9"
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="e.g., 123 Main St"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pinCode">Postal/ZIP Code *</Label>
                    <Input
                      id="pinCode"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      placeholder="e.g., 94105"
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => navigate("/jobs")}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createJobMutation.isPending}
              >
                {createJobMutation.isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting Job...
                  </>
                ) : (
                  "Post Job"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PostJob;
