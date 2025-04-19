
import React, { useState } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Save, 
  Upload, 
  Trash, 
  Plus, 
  FileText, 
  Calendar,
  GraduationCap,
  Briefcase,
  Github,
  Linkedin
} from "lucide-react";

const EmployeeProfile = () => {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("/placeholder.svg");
  const [skills, setSkills] = useState([
    { id: 1, name: "React", experience: 3 },
    { id: 2, name: "JavaScript", experience: 4 },
    { id: 3, name: "TypeScript", experience: 2 },
  ]);
  const [newSkill, setNewSkill] = useState({ name: "", experience: 1 });
  const [educations, setEducations] = useState([
    { 
      id: 1, 
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      startDate: "2015-09-01",
      endDate: "2019-06-30"
    }
  ]);
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      position: "Frontend Developer",
      company: "TechSolutions Inc.",
      startDate: "2019-07-01",
      endDate: "2022-12-31",
      description: "Developed responsive web applications using React and TypeScript. Collaborated with UX designers and backend developers to implement features."
    }
  ]);
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }, 1500);
  };
  
  const handleAddSkill = () => {
    if (!newSkill.name.trim()) {
      toast({
        title: "Error",
        description: "Skill name is required.",
        variant: "destructive",
      });
      return;
    }
    
    const maxId = skills.length ? Math.max(...skills.map(s => s.id)) : 0;
    setSkills([...skills, { ...newSkill, id: maxId + 1 }]);
    setNewSkill({ name: "", experience: 1 });
  };
  
  const handleRemoveSkill = (id: number) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-6">
            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSave}>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden">
                        <img 
                          src={profileImageUrl} 
                          alt="Profile" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <Button variant="outline" size="sm" className="mb-2 w-full">
                        <Upload size={16} className="mr-2" />
                        Upload Photo
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        Recommended: 400x400px, JPG or PNG, max 2MB
                      </p>
                    </div>
                    
                    <div className="md:w-2/3 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue="New York, NY" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Summary</Label>
                    <Textarea 
                      id="bio" 
                      rows={4} 
                      defaultValue="Experienced Frontend Developer with 3+ years of experience in building responsive web applications using React, JavaScript, and TypeScript. Passionate about creating clean, efficient, and user-friendly interfaces."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="githubUrl">GitHub URL</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                          <Github size={16} />
                        </span>
                        <Input id="githubUrl" defaultValue="github.com/johndoe" className="rounded-l-none" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                          <Linkedin size={16} />
                        </span>
                        <Input id="linkedinUrl" defaultValue="linkedin.com/in/johndoe" className="rounded-l-none" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="websiteUrl">Personal Website</Label>
                    <Input id="websiteUrl" type="url" defaultValue="https://johndoe.com" />
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-end">
                  <Button type="submit" disabled={saving}>
                    {saving ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>
                  Add skills to showcase your expertise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="flex items-center">
                        <div className="font-medium">{skill.name}</div>
                        <div className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                          {skill.experience} {skill.experience === 1 ? 'year' : 'years'}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveSkill(skill.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="skillName">Skill Name</Label>
                    <Input 
                      id="skillName" 
                      placeholder="e.g. React, JavaScript, Project Management" 
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input 
                      id="experience" 
                      type="number" 
                      min={0}
                      max={20}
                      value={newSkill.experience}
                      onChange={(e) => setNewSkill({ ...newSkill, experience: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleAddSkill}>
                  <Plus size={16} className="mr-2" />
                  Add Skill
                </Button>
                <Button>
                  <Save size={16} className="mr-2" />
                  Save All
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>
                  Add your educational background
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {educations.map((education) => (
                  <div key={education.id} className="rounded-lg border p-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{education.degree}</h3>
                        <p className="text-gray-600">{education.institution}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar size={14} className="mr-1" />
                          {new Date(education.startDate).toLocaleDateString()} - {new Date(education.endDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-center pt-4">
                  <Button variant="outline">
                    <GraduationCap size={16} className="mr-2" />
                    Add Education
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>
                  Add your professional experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {experiences.map((experience) => (
                  <div key={experience.id} className="rounded-lg border p-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{experience.position}</h3>
                        <p className="text-gray-600">{experience.company}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar size={14} className="mr-1" />
                          {new Date(experience.startDate).toLocaleDateString()} - {new Date(experience.endDate).toLocaleDateString()}
                        </div>
                        <p className="mt-2 text-sm text-gray-700">{experience.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-center pt-4">
                  <Button variant="outline">
                    <Briefcase size={16} className="mr-2" />
                    Add Experience
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="resume" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume / CV</CardTitle>
                <CardDescription>
                  Upload your resume or CV
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12">
                  <FileText size={48} className="text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload your resume</h3>
                  <p className="text-sm text-gray-500 mb-4 text-center">
                    Drag and drop your resume file here, or click to browse
                    <br />
                    Supported formats: PDF, DOCX, max 5MB
                  </p>
                  <Button>
                    <Upload size={16} className="mr-2" />
                    Browse Files
                  </Button>
                </div>
                
                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FileText size={24} className="text-primary mr-3" />
                      <div>
                        <h3 className="font-medium">john-doe-resume.pdf</h3>
                        <p className="text-sm text-gray-500">Uploaded on May 15, 2023</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Upload size={16} className="mr-2" />
                        Replace
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeProfile;
