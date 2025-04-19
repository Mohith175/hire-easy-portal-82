
import React, { createContext, useContext, useState, useEffect } from "react";

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
  register: (userData: Partial<AuthUser>) => Promise<boolean>;
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

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call - in a real app, this would be an actual API request
      // For demo purposes, we're creating a mock user
      const mockUser: AuthUser = {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: email,
        token: "mock-jwt-token",
        role: email.includes("admin") ? "ADMIN" : 
              email.includes("employer") ? "EMPLOYER" : 
              "EMPLOYEE"
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const register = async (userData: Partial<AuthUser>): Promise<boolean> => {
    try {
      // Simulate API call - in a real app, this would be an actual API request
      const mockUser: AuthUser = {
        id: Math.floor(Math.random() * 1000) + 1,
        firstName: userData.firstName || "New",
        lastName: userData.lastName || "User",
        email: userData.email || "user@example.com",
        token: "mock-jwt-token",
        role: userData.role || "EMPLOYEE"
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading,
        login, 
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
