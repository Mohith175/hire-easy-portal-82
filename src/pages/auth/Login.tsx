
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Briefcase, User } from "lucide-react";

interface LoginForm {
  email: string;
  password: string;
  role: "EMPLOYER" | "EMPLOYEE" | "ADMIN";
}

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
    role: "EMPLOYEE"
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This is a mock login - in a real implementation, this would connect to your backend API
      const response = await mockLogin(formData);
      
      if (response.success) {
        login(response.token, response.user);
        
        toast({
          title: "Login successful",
          description: "You have been logged in successfully.",
          variant: "default",
        });
        
        // Redirect based on user role
        if (response.user.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else if (response.user.role === "EMPLOYER") {
          navigate("/employer/dashboard");
        } else {
          navigate("/employee/dashboard");
        }
      } else {
        toast({
          title: "Login failed",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRoleChange = (role: "EMPLOYER" | "EMPLOYEE") => {
    setFormData({ ...formData, role });
  };
  
  // Mock login function (replace with actual API call)
  const mockLogin = async (data: LoginForm) => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    // For demo purposes, auto-login with any credentials
    return {
      success: true,
      token: "mock-jwt-token",
      user: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: data.email,
        role: data.role
      },
      message: "Login successful"
    };
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your account
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
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary hover:text-primary-600">
                      Forgot your password?
                    </a>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link to="/register" className="font-medium text-primary hover:text-primary-600">
                    Create an account
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
