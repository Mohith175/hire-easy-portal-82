
import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Briefcase, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  FileText, 
  PlusCircle,
  TrendingUp,
  Eye
} from "lucide-react";

// Sample data for charts
const applicationStats = [
  { name: "Jan", applications: 15 },
  { name: "Feb", applications: 25 },
  { name: "Mar", applications: 35 },
  { name: "Apr", applications: 40 },
  { name: "May", applications: 30 },
  { name: "Jun", applications: 45 },
];

const applicationStatusData = [
  { name: "Pending", value: 45 },
  { name: "Reviewing", value: 25 },
  { name: "Accepted", value: 20 },
  { name: "Rejected", value: 10 },
];

const COLORS = ["#2563eb", "#0d9488", "#16a34a", "#dc2626"];

// Recent applications data
const recentApplications = [
  {
    id: 1,
    jobTitle: "Senior Software Engineer",
    applicantName: "John Smith",
    date: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    jobTitle: "UX Designer",
    applicantName: "Emily Johnson",
    date: "5 hours ago",
    status: "reviewing",
  },
  {
    id: 3,
    jobTitle: "Product Manager",
    applicantName: "Michael Brown",
    date: "Yesterday",
    status: "accepted",
  },
  {
    id: 4,
    jobTitle: "Frontend Developer",
    applicantName: "Sarah Davis",
    date: "Yesterday",
    status: "rejected",
  },
];

// Active jobs data
const activeJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    location: "New York, NY",
    type: "Full-time",
    applicants: 12,
    posted: "2 weeks ago",
  },
  {
    id: 2,
    title: "Product Manager",
    location: "Remote",
    type: "Full-time",
    applicants: 8,
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "UX Designer",
    location: "San Francisco, CA",
    type: "Full-time",
    applicants: 5,
    posted: "3 days ago",
  },
];

const EmployerDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold">Employer Dashboard</h1>
          <Link to="/employer/post-job">
            <Button className="w-full md:w-auto animate-pulse-scale">
              <PlusCircle size={18} className="mr-2" />
              Post a New Job
            </Button>
          </Link>
        </div>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="flex items-center pt-6">
              <div className="p-2 rounded-full bg-blue-100 mr-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                <h3 className="text-2xl font-bold">8</h3>
                <p className="text-xs text-green-500">+2 this month</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="flex items-center pt-6">
              <div className="p-2 rounded-full bg-green-100 mr-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applicants</p>
                <h3 className="text-2xl font-bold">42</h3>
                <p className="text-xs text-green-500">+8 this week</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="flex items-center pt-6">
              <div className="p-2 rounded-full bg-orange-100 mr-4">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <h3 className="text-2xl font-bold">15</h3>
                <p className="text-xs text-red-500">+5 since yesterday</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="flex items-center pt-6">
              <div className="p-2 rounded-full bg-teal-100 mr-4">
                <CheckCircle className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hired Candidates</p>
                <h3 className="text-2xl font-bold">7</h3>
                <p className="text-xs text-green-500">+1 this month</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Data visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Applications Received</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={applicationStats}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "white", 
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        border: "none" 
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="applications"
                      name="Applications"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={applicationStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {applicationStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "white", 
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        border: "none" 
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Applications</CardTitle>
              <Link to="/employer/applications">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 text-sm font-medium text-gray-500">Job</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-500">Applicant</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-500">Date</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-right p-3 text-sm font-medium text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.map((application) => (
                    <tr key={application.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-3 text-sm">{application.jobTitle}</td>
                      <td className="p-3 text-sm">{application.applicantName}</td>
                      <td className="p-3 text-sm text-gray-500">{application.date}</td>
                      <td className="p-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium
                          ${application.status === 'pending' ? 'bg-blue-100 text-blue-800' : ''}
                          ${application.status === 'reviewing' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${application.status === 'accepted' ? 'bg-green-100 text-green-800' : ''}
                          ${application.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                        `}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-right">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} className="mr-1" /> View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Active Jobs */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Active Job Listings</CardTitle>
              <Link to="/employer/post-job">
                <Button size="sm">
                  <PlusCircle size={16} className="mr-1" /> Add New
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {activeJobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm mt-2">
                    <span className="mr-3">{job.location}</span>
                    <span className="mr-3">{job.type}</span>
                    <span>Posted {job.posted}</span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-primary font-medium">
                      {job.applicants} applicants
                    </span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">Delete</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-center border-t pt-6">
            <Link to="/employer/post-job">
              <Button variant="outline">
                <PlusCircle size={16} className="mr-2" />
                Post Another Job
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EmployerDashboard;
