
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const PostJob = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would send data to your API
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Job posted successfully",
        description: "Your job listing has been created.",
      });
      navigate("/employer/applications");
    }, 1500);
  };
  
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
        
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Provide the basic information about the job position
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input id="title" placeholder="e.g. Senior Frontend Developer" required />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Job Category *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">IT & Software</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="customer">Customer Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Job Type *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea id="description" rows={6} placeholder="Provide a detailed description of the job position..." required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills *</Label>
                <Input id="skills" placeholder="e.g. React, JavaScript, TypeScript, HTML, CSS" required />
                <p className="text-xs text-gray-500">Separate skills with commas</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Compensation & Location</CardTitle>
              <CardDescription>
                Provide salary details and job location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-salary">Minimum Salary</Label>
                  <Input id="min-salary" type="number" placeholder="e.g. 60000" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max-salary">Maximum Salary</Label>
                  <Input id="max-salary" type="number" placeholder="e.g. 80000" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="salary-type">Salary Display</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="How to display salary" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exact">Exact Amount</SelectItem>
                    <SelectItem value="range">Salary Range</SelectItem>
                    <SelectItem value="negotiable">Negotiable</SelectItem>
                    <SelectItem value="hide">Don't Display</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Required Experience *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level (0-1 years)</SelectItem>
                    <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                    <SelectItem value="mid">Mid-Level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior (5+ years)</SelectItem>
                    <SelectItem value="lead">Lead/Manager (7+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" placeholder="e.g. New York" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" placeholder="e.g. NY" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input id="country" placeholder="e.g. United States" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="remote">Remote Options</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select remote option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onsite">On-site only</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>
                Provide any additional details about the position
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="responsibilities">Key Responsibilities</Label>
                <Textarea id="responsibilities" rows={4} placeholder="Describe the key responsibilities for this position..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea id="requirements" rows={4} placeholder="List the educational and professional requirements..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits & Perks</Label>
                <Textarea id="benefits" rows={4} placeholder="Describe the benefits and perks offered..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="application-deadline">Application Deadline</Label>
                <Input id="application-deadline" type="date" />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/employer/dashboard")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
                  Posting...
                </>
              ) : (
                'Post Job'
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default PostJob;
