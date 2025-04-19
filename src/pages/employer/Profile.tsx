
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
import { Building, MapPin, Mail, Phone, User, Image, Save } from "lucide-react";

const EmployerProfile = () => {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("/placeholder.svg");
  
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
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Company Profile</h1>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Update your company's basic information
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSave}>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <div className="w-32 h-32 rounded-lg bg-gray-200 mb-4 overflow-hidden">
                        <img 
                          src={profileImageUrl} 
                          alt="Company logo" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <Button variant="outline" size="sm" className="mb-2 w-full">
                        <Image size={16} className="mr-2" />
                        Upload Logo
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        Recommended: 400x400px, JPG or PNG, max 2MB
                      </p>
                    </div>
                    
                    <div className="md:w-2/3 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input id="companyName" defaultValue="TechSolutions Inc." />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Input id="industry" defaultValue="Information Technology" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" type="url" defaultValue="https://example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="foundedYear">Founded Year</Label>
                        <Input id="foundedYear" type="number" defaultValue="2010" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="companySize">Company Size</Label>
                        <Input id="companySize" defaultValue="51-200 employees" />
                      </div>
                    </div>
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
            
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Update your company's contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input id="contactPerson" defaultValue="John Doe" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" defaultValue="HR Manager" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="contact@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" defaultValue="123 Business Ave" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="New York" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" defaultValue="NY" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip/Postal Code</Label>
                    <Input id="zipCode" defaultValue="10001" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue="United States" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            {/* Company Description */}
            <Card>
              <CardHeader>
                <CardTitle>Company Description</CardTitle>
                <CardDescription>
                  Tell job seekers about your company
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">About the Company</Label>
                  <Textarea 
                    id="description" 
                    rows={6}
                    defaultValue="TechSolutions is a leading tech company specializing in developing innovative software solutions for businesses of all sizes. With a team of over 200 talented professionals, we're dedicated to creating products that help our clients succeed in the digital world."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="benefits">Company Benefits & Culture</Label>
                  <Textarea 
                    id="benefits" 
                    rows={4}
                    defaultValue="We offer a range of benefits including health insurance, flexible work arrangements, professional development opportunities, and a collaborative work environment. Our culture emphasizes innovation, teamwork, and work-life balance."
                  />
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
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Update Password</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-factor authentication</h3>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Configure which notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New applications</h3>
                      <p className="text-sm text-gray-500">Get notified when someone applies to your job posting</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="newApplications" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Application status updates</h3>
                      <p className="text-sm text-gray-500">Get notified when you update an application status</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="statusUpdates" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Job posting expiration</h3>
                      <p className="text-sm text-gray-500">Get notified when your job posting is about to expire</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="jobExpiration" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Marketing emails</h3>
                      <p className="text-sm text-gray-500">Receive emails about new features and promotions</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="marketing" className="h-4 w-4 rounded border-gray-300" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EmployerProfile;
