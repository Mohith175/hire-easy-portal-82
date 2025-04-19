
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Dashboard Pages
import AdminDashboard from "./pages/admin/Dashboard";
import EmployerDashboard from "./pages/employer/Dashboard";
import EmployeeDashboard from "./pages/employee/Dashboard";

// Job Pages
import Jobs from "./pages/jobs/Jobs";
import JobDetails from "./pages/jobs/JobDetails";
import PostJob from "./pages/employer/PostJob";

// Profile Pages
import EmployerProfile from "./pages/employer/Profile";
import EmployeeProfile from "./pages/employee/Profile";

// Applications Pages
import Applications from "./pages/employer/Applications";
import MyApplications from "./pages/employee/MyApplications";

// Category Management
import Categories from "./pages/admin/Categories";

// Admin Management Pages
import ManageEmployers from "./pages/admin/ManageEmployers";
import ManageEmployees from "./pages/admin/ManageEmployees";
import AdminProfilePage from "./pages/admin/Profile";

// Protected Route Component
import ProtectedRoute from "./components/common/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/categories" 
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <Categories />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/employers" 
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <ManageEmployers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/employees" 
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <ManageEmployees />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/profile" 
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminProfilePage />
                </ProtectedRoute>
              } 
            />
            
            {/* Employer Routes */}
            <Route 
              path="/employer/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                  <EmployerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employer/post-job" 
              element={
                <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                  <PostJob />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employer/applications" 
              element={
                <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                  <Applications />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employer/profile" 
              element={
                <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                  <EmployerProfile />
                </ProtectedRoute>
              } 
            />
            
            {/* Employee Routes */}
            <Route 
              path="/employee/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employee/profile" 
              element={
                <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                  <EmployeeProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employee/applications" 
              element={
                <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                  <MyApplications />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
