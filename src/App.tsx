
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Auth from "./pages/auth/Auth";

// Job Pages
import Jobs from "./pages/jobs/Jobs";
import JobDetails from "./pages/jobs/JobDetails";
import PostJob from "./pages/jobs/PostJob";

// User Pages
import Profile from "./pages/user/Profile";
import MyApplications from "./pages/user/MyApplications";
import MyJobs from "./pages/user/MyJobs";

// Admin Management Pages (we keep these for now)
import AdminDashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
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
      meta: {
        onError: (error: any) => {
          // Check for connection errors to show friendlier messages
          if (error.isConnectionError) {
            console.error("Backend connection error detected");
          }
        }
      }
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
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/error" element={<ErrorPage />} />
            
            {/* Job Management */}
            <Route 
              path="/jobs/post" 
              element={
                <ProtectedRoute allowedRoles={["*"]}>
                  <PostJob />
                </ProtectedRoute>
              } 
            />
            
            {/* User Routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute allowedRoles={["*"]}>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/applications" 
              element={
                <ProtectedRoute allowedRoles={["*"]}>
                  <MyApplications />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-jobs" 
              element={
                <ProtectedRoute allowedRoles={["*"]}>
                  <MyJobs />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes - These are kept for now */}
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
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} errorElement={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
