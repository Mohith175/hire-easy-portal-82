
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { login, register, RegisterData, LoginResponse } from "@/services/authService";

export interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  role?: UserRole;
}

export type UserRole = "ADMIN" | "EMPLOYER" | "EMPLOYEE" | "*";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      // Make API call to Spring Boot backend
      const response = await login(email, password);
      
      // Create user object from response
      const loggedInUser: AuthUser = {
        id: parseInt(response.userId),
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        token: response.token,
        role: response.role as UserRole
      };
      
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${loggedInUser.firstName}!`,
      });
      
      return true;
    } catch (error: any) {
      console.error("Login failed:", error);
      
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleRegister = async (userData: RegisterData): Promise<boolean> => {
    try {
      // Make API call to Spring Boot backend
      await register(userData);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please log in.",
      });
      
      return true;
    } catch (error: any) {
      console.error("Registration failed:", error);
      
      toast({
        title: "Registration failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading,
        login: handleLogin, 
        logout: handleLogout,
        register: handleRegister
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
