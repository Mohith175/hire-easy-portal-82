import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/common/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { createJob, getJobCategories } from "@/services/jobService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Briefcase, Building2, MapPin } from "lucide-react";

const PostJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = React.useState({
    title: "",
    company_name: "",
    description: "",
    job_type: "Full-time",
    location: "",
    salary_range: "",
    experience: "",
    skills: "",
    city: "",
    country: "",
  });
  
  const { data: categories } = useQuery({
    queryKey: ['jobCategories'],
    queryFn: getJobCategories
  });
  
  const createJobMutation = useMutation({
    mutationFn: () => {
      if (!user?.id) throw new Error("User not authenticated");
      return createJob(user.id, formData);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Job posted successfully",
      });
      navigate("/jobs");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to post job",
        variant: "destructive",
      });
    },
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createJobMutation.mutate();
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Post a New Job</CardTitle>
            <CardDescription>Fill in the job details below</CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <div className="relative">
                      <Input
                        required
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="pl-9"
                        placeholder="e.g. Senior Frontend Developer"
                      />
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name *</Label>
                    <div className="relative">
                      <Input
                        required
                        id="company_name"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        className="pl-9"
                        placeholder="e.g. Acme Inc"
                      />
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    required
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the role, responsibilities, and requirements..."
                    rows={6}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job_type">Job Type *</Label>
                    <Select
                      value={formData.job_type}
                      onValueChange={(value) => handleSelectChange("job_type", value)}
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
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="salary_range">Salary Range</Label>
                    <Input
                      id="salary_range"
                      name="salary_range"
                      value={formData.salary_range}
                      onChange={handleChange}
                      placeholder="e.g. $60,000 - $80,000"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <div className="relative">
                      <Input
                        required
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="pl-9"
                        placeholder="e.g. New York"
                      />
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      required
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="e.g. United States"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills</Label>
                  <Input
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g. React, TypeScript, Node.js (comma separated)"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Input
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 3+ years"
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => navigate("/jobs")}>
                Cancel
              </Button>
              <Button type="submit" disabled={createJobMutation.isPending}>
                {createJobMutation.isPending ? "Posting..." : "Post Job"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PostJob;
