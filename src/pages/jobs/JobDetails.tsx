
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/common/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  MapPin,
  Briefcase,
  Building,
  DollarSign,
  CalendarDays,
  Share2,
  Bookmark,
  Clock,
  CheckSquare,
  Award,
  Users,
  GraduationCap,
  FileText,
  Send,
  AlertCircle,
} from "lucide-react";

// Sample job data (in a real app, you would fetch this from an API)
const jobsData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechSolutions Inc.",
    logo: "T",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110K - $130K",
    postedDate: "2 days ago",
    description: "<p>We're looking for a Senior Frontend Developer with 5+ years of experience in React and modern JavaScript frameworks to join our team.</p><p>As a Senior Frontend Developer at TechSolutions, you'll be responsible for building high-quality, responsive web applications that deliver exceptional user experiences. You'll work closely with designers, product managers, and backend developers to implement new features and optimize existing ones.</p>",
    category: "IT & Software",
    responsibilities: [
      "Build efficient and reusable frontend components",
      "Collaborate with UX designers to implement seamless user experiences",
      "Optimize applications for maximum speed and scalability",
      "Maintain code quality, organization, and automatization",
      "Implement responsive design and ensure cross-browser compatibility",
      "Participate in code reviews and mentor junior developers"
    ],
    requirements: [
      "5+ years of experience in frontend development",
      "Strong proficiency in JavaScript, HTML, CSS, and React",
      "Experience with modern frameworks and libraries (TypeScript, Redux, etc.)",
      "Familiarity with RESTful APIs and GraphQL",
      "Understanding of UI/UX design principles",
      "Excellent problem-solving skills and attention to detail",
      "BSc in Computer Science or related field (or equivalent experience)"
    ],
    benefits: [
      "Competitive salary based on experience",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work schedule with remote options",
      "Professional development budget",
      "401(k) matching",
      "Generous PTO policy",
      "Regular team events and activities"
    ],
    companyInfo: {
      name: "TechSolutions Inc.",
      description: "TechSolutions is a leading tech company specializing in developing innovative software solutions for businesses of all sizes. With a team of over 200 talented professionals, we're dedicated to creating products that help our clients succeed in the digital world.",
      founded: 2010,
      employees: "201-500",
      industry: "Software Development",
      website: "https://example.com",
    },
    tags: ["React", "JavaScript", "TypeScript", "Redux", "HTML/CSS"]
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Creative Designs",
    logo: "C",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$90K - $110K",
    postedDate: "3 days ago",
    description: "<p>Join our creative team as a UX/UI Designer to create beautiful and intuitive user experiences for our products and clients.</p><p>As a UX/UI Designer at Creative Designs, you'll be responsible for the user experience of our products from conception to launch. You'll collaborate with cross-functional teams to define, design, and ship new features and improvements to our product lineup.</p>",
    category: "Design",
    responsibilities: [
      "Create user-centered designs by understanding business requirements and user feedback",
      "Develop and conceptualize comprehensive UI/UX design strategies",
      "Design UI elements and tools such as navigation menus, search boxes, tabs, and widgets",
      "Create original graphic designs (e.g. images, sketches, and tables)",
      "Prepare and present rough drafts to stakeholders",
      "Conduct layout adjustments based on user feedback",
      "Identify and troubleshoot UX problems"
    ],
    requirements: [
      "3+ years of experience in UI/UX design",
      "Proficiency in design tools such as Figma, Adobe XD, and Sketch",
      "Experience with interaction design and information architecture",
      "Solid understanding of user research and usability principles",
      "Ability to work effectively in a team environment",
      "Portfolio demonstrating strong visual design and UI/UX skills",
      "Degree in Design, Fine Arts, or related field (preferred but not required)"
    ],
    benefits: [
      "Competitive salary based on experience",
      "Health, dental, and vision insurance",
      "Unlimited PTO policy",
      "Remote-friendly work environment",
      "Professional development opportunities",
      "Equipment stipend",
      "Creative work environment with regular team activities"
    ],
    companyInfo: {
      name: "Creative Designs",
      description: "Creative Designs is a design-forward agency that specializes in creating beautiful, functional digital experiences for brands that want to make an impact. We work with clients across industries to elevate their digital presence through thoughtful design and user-centered thinking.",
      founded: 2015,
      employees: "51-200",
      industry: "Design & Creative Services",
      website: "https://example.com",
    },
    tags: ["Figma", "Adobe XD", "UI Design", "User Research", "Prototyping"]
  }
];

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch the job details from an API
    const jobId = parseInt(id || "1");
    const foundJob = jobsData.find(j => j.id === jobId);
    
    // Simulate API call
    setTimeout(() => {
      setJob(foundJob);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Job removed from saved jobs" : "Job saved successfully",
      description: isSaved 
        ? "The job has been removed from your saved jobs."
        : "You can access this job later in your saved jobs.",
      variant: isSaved ? "destructive" : "default",
    });
  };

  const handleShareJob = () => {
    // In a real app, this would open a share dialog or copy to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this job with others.",
    });
  };

  const handleApplyJob = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to apply for this job.",
        variant: "destructive",
      });
      return;
    }
    
    if (user?.role !== "EMPLOYEE") {
      toast({
        title: "Invalid account type",
        description: "Only job seekers can apply for jobs.",
        variant: "destructive",
      });
      return;
    }

    setApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      setApplying(false);
      toast({
        title: "Application submitted",
        description: "Your application has been sent to the employer.",
      });
    }, 1500);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!job) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-6">
                <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
                <p className="text-gray-500 mb-6">
                  The job you're looking for doesn't exist or has been removed.
                </p>
                <Link to="/jobs">
                  <Button>Browse All Jobs</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 animate-fade-in">
            {/* Job Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 rounded-lg bg-primary text-white flex items-center justify-center text-2xl font-bold mr-4">
                    {job.logo}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
                    <div className="text-lg text-gray-700 mb-2">{job.company}</div>
                    <div className="flex flex-wrap items-center text-sm text-gray-500 gap-y-1">
                      <span className="flex items-center mr-4">
                        <MapPin size={14} className="mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center mr-4">
                        <Briefcase size={14} className="mr-1" />
                        {job.type}
                      </span>
                      <span className="flex items-center mr-4">
                        <DollarSign size={14} className="mr-1" />
                        {job.salary}
                      </span>
                      <span className="flex items-center">
                        <CalendarDays size={14} className="mr-1" />
                        Posted {job.postedDate}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-4 md:justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSaveJob}
                  >
                    <Bookmark size={16} className={`mr-2 ${isSaved ? 'fill-primary' : ''}`} />
                    {isSaved ? 'Saved' : 'Save Job'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShareJob}
                  >
                    <Share2 size={16} className="mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Job Details Tabs */}
            <Tabs defaultValue="job-details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="job-details">Job Details</TabsTrigger>
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="more-jobs">More Jobs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="job-details" className="mt-6 space-y-6">
                {/* Job Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: job.description }} />
                  </CardContent>
                </Card>
                
                {/* Responsibilities */}
                <Card>
                  <CardHeader>
                    <CardTitle>Responsibilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.responsibilities.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckSquare size={18} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.requirements.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckSquare size={18} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.benefits.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Award size={18} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="company" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {job.companyInfo.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-700">{job.companyInfo.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <Building size={18} className="text-primary mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Industry</h4>
                          <p className="text-gray-600">{job.companyInfo.industry}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CalendarDays size={18} className="text-primary mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Founded</h4>
                          <p className="text-gray-600">{job.companyInfo.founded}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Users size={18} className="text-primary mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Company Size</h4>
                          <p className="text-gray-600">{job.companyInfo.employees} employees</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <GraduationCap size={18} className="text-primary mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Website</h4>
                          <a href={job.companyInfo.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Visit Company Website
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="more-jobs" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>More Jobs from {job.company}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* This would be populated with actual job data in a real application */}
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">No other job openings available at the moment.</p>
                        <Link to="/jobs">
                          <Button variant="outline">Browse All Jobs</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="shadow-md animate-fade-in">
              <CardHeader>
                <CardTitle>Apply for this Job</CardTitle>
                <CardDescription>
                  Submit your application quickly and easily
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock size={18} className="text-primary mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Estimated Response Time</p>
                      <p className="font-medium">3-5 business days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FileText size={18} className="text-primary mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Application Requirements</p>
                      <p className="font-medium">Resume, Portfolio (optional)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  className="w-full"
                  onClick={handleApplyJob}
                  disabled={applying}
                >
                  {applying ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Apply Now
                    </>
                  )}
                </Button>
                
                {!isAuthenticated && (
                  <p className="text-sm text-gray-500 text-center">
                    You need to{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      sign in
                    </Link>{" "}
                    to apply for this job.
                  </p>
                )}
              </CardFooter>
            </Card>
            
            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobsData
                  .filter(j => j.id !== job.id && j.category === job.category)
                  .slice(0, 3)
                  .map((similarJob) => (
                    <Link key={similarJob.id} to={`/jobs/${similarJob.id}`} className="block">
                      <div className="border rounded p-4 hover:shadow-md transition-shadow duration-300">
                        <h3 className="font-medium">{similarJob.title}</h3>
                        <p className="text-sm text-gray-600">{similarJob.company}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-2">
                          <MapPin size={12} className="mr-1" />
                          {similarJob.location}
                        </div>
                      </div>
                    </Link>
                  ))}
                
                <div className="text-center pt-2">
                  <Link to="/jobs" className="text-primary hover:underline text-sm">
                    View All Jobs
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Job Alert */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Create Job Alert</CardTitle>
                <CardDescription>
                  Get notified when similar jobs are posted
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Create Alert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobDetails;
