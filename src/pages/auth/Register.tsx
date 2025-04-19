
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Briefcase, User, CheckCircle } from "lucide-react";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  contact: string;
  role: "EMPLOYER" | "EMPLOYEE";
  company?: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    role: "EMPLOYEE",
    company: ""
  });
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleRoleChange = (role: "EMPLOYER" | "EMPLOYEE") => {
    setFormData({ ...formData, role });
  };
  
  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };
  
  const validateStep2 = () => {
    if (!formData.password || !formData.confirmPassword) {
      toast({
        title: "Missing information",
        description: "Please enter and confirm your password.",
        variant: "destructive",
      });
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Your passwords do not match.",
        variant: "destructive",
      });
      return false;
    }
    
    if (formData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This is a mock registration - in a real implementation, this would connect to your backend API
      const response = await mockRegister(formData);
      
      if (response.success) {
        login(response.token, response.user);
        
        toast({
          title: "Registration successful",
          description: "Your account has been created successfully.",
          variant: "default",
        });
        
        // Redirect based on user role
        if (response.user.role === "EMPLOYER") {
          navigate("/employer/dashboard");
        } else {
          navigate("/employee/dashboard");
        }
      } else {
        toast({
          title: "Registration failed",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Mock registration function (replace with actual API call)
  const mockRegister = async (data: RegisterForm) => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    // For demo purposes, auto-register with any credentials
    return {
      success: true,
      token: "mock-jwt-token",
      user: {
        id: 1,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role
      },
      message: "Registration successful"
    };
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our platform to connect with opportunities
          </p>
        </div>
        
        <Tabs defaultValue="employee" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger 
              value="employee" 
              onClick={() => handleRoleChange("EMPLOYEE")}
              className="flex items-center gap-2"
            >
              <User size={16} />
              Job Seeker
            </TabsTrigger>
            <TabsTrigger 
              value="employer" 
              onClick={() => handleRoleChange("EMPLOYER")}
              className="flex items-center gap-2"
            >
              <Briefcase size={16} />
              Employer
            </TabsTrigger>
          </TabsList>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between mb-2">
                <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                  <div className="rounded-full bg-primary/10 p-1">
                    <CheckCircle size={16} className={step > 1 ? 'text-green-500' : ''} />
                  </div>
                  <span className="ml-2 text-sm">Basic Info</span>
                </div>
                <div className="h-0.5 w-10 bg-gray-200 self-center"></div>
                <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                  <div className="rounded-full bg-primary/10 p-1">
                    <CheckCircle size={16} className={step > 2 ? 'text-green-500' : ''} />
                  </div>
                  <span className="ml-2 text-sm">Security</span>
                </div>
                <div className="h-0.5 w-10 bg-gray-200 self-center"></div>
                <div className={`flex items-center ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
                  <div className="rounded-full bg-primary/10 p-1">
                    <CheckCircle size={16} className={step > 3 ? 'text-green-500' : ''} />
                  </div>
                  <span className="ml-2 text-sm">Finish</span>
                </div>
              </div>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                {step === 1 && "Enter your personal information"}
                {step === 2 && "Create a secure password"}
                {step === 3 && "Review your information"}
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact">Phone Number</Label>
                      <Input
                        id="contact"
                        name="contact"
                        type="tel"
                        placeholder="(123) 456-7890"
                        value={formData.contact}
                        onChange={handleChange}
                      />
                    </div>
                    
                    {formData.role === "EMPLOYER" && (
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Your Company"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>
                    )}
                  </>
                )}
                
                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>Your password must:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Be at least 6 characters long</li>
                        <li>Include at least one uppercase letter</li>
                        <li>Include at least one number</li>
                      </ul>
                    </div>
                  </>
                )}
                
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gray-50 p-4 space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Name:</span>
                        <p>{formData.firstName} {formData.lastName}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Email:</span>
                        <p>{formData.email}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Phone:</span>
                        <p>{formData.contact || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Account Type:</span>
                        <p>{formData.role === "EMPLOYER" ? "Employer" : "Job Seeker"}</p>
                      </div>
                      {formData.role === "EMPLOYER" && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Company:</span>
                          <p>{formData.company || "Not provided"}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                        I agree to the{" "}
                        <a href="#" className="text-primary hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    Back
                  </Button>
                )}
                
                <div className={step === 1 ? "w-full" : ""}>
                  {step < 3 ? (
                    <Button
                      type="button"
                      className={step === 1 ? "w-full" : ""}
                      onClick={nextStep}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  )}
                </div>
              </CardFooter>
            </form>
            
            <div className="p-6 text-center text-sm border-t">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default Register;
