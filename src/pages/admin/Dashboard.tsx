
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Users, Briefcase, Building, Tag, TrendingUp } from "lucide-react";

// Sample data for charts
const userStats = [
  { name: "Jan", employers: 65, employees: 120 },
  { name: "Feb", employers: 75, employees: 130 },
  { name: "Mar", employers: 85, employees: 145 },
  { name: "Apr", employers: 90, employees: 160 },
  { name: "May", employers: 100, employees: 180 },
  { name: "Jun", employers: 110, employees: 190 },
];

const jobStats = [
  { name: "Jan", jobs: 40 },
  { name: "Feb", jobs: 60 },
  { name: "Mar", jobs: 80 },
  { name: "Apr", jobs: 100 },
  { name: "May", jobs: 120 },
  { name: "Jun", jobs: 150 },
];

const applicationStatusData = [
  { name: "Pending", value: 45 },
  { name: "Reviewing", value: 25 },
  { name: "Accepted", value: 20 },
  { name: "Rejected", value: 10 },
];

const COLORS = ["#2563eb", "#0d9488", "#16a34a", "#dc2626"];

// Recent activity data
const recentActivities = [
  {
    id: 1,
    action: "New employer registered",
    company: "Tech Solutions Inc.",
    date: "2 hours ago",
  },
  {
    id: 2,
    action: "New job posted",
    title: "Senior Software Engineer",
    company: "Digital Innovations",
    date: "5 hours ago",
  },
  {
    id: 3,
    action: "New job category added",
    category: "Artificial Intelligence",
    date: "Yesterday",
  },
  {
    id: 4,
    action: "New employee registered",
    name: "Sarah Johnson",
    date: "Yesterday",
  },
  {
    id: 5,
    action: "Application status updated",
    job: "Full Stack Developer",
    status: "Interview",
    date: "2 days ago",
  },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="flex items-center pt-6">
              <div className="p-2 rounded-full bg-blue-100 mr-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Job Seekers</p>
                <h3 className="text-2xl font-bold">1,245</h3>
                <p className="text-xs text-green-500">+12% from last month</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="flex items-center pt-6">
              <div className="p-2 rounded-full bg-teal-100 mr-4">
                <Building className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Employers</p>
                <h3 className="text-2xl font-bold">386</h3>
                <p className="text-xs text-green-500">+8% from last month</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="flex items-center pt-6">
              <div className="p-2 rounded-full bg-indigo-100 mr-4">
                <Briefcase className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                <h3 className="text-2xl font-bold">742</h3>
                <p className="text-xs text-green-500">+15% from last month</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="flex items-center pt-6">
              <div className="p-2 rounded-full bg-purple-100 mr-4">
                <Tag className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Job Categories</p>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-xs text-green-500">+2 new categories</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Data visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={userStats}
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
                    <Bar dataKey="employers" name="Employers" fill="#0d9488" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="employees" name="Job Seekers" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Jobs Posted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={jobStats}
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
                      dataKey="jobs"
                      name="Jobs Posted"
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
        </div>
        
        {/* Additional information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start border-b border-gray-200 pb-3 last:border-b-0 last:pb-0"
                  >
                    <div className="p-2 rounded-full bg-blue-100 mr-3">
                      <TrendingUp size={14} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{activity.action}</p>
                      <div className="text-sm text-gray-500">
                        {activity.company && <span>Company: {activity.company}</span>}
                        {activity.title && <span> | Title: {activity.title}</span>}
                        {activity.category && <span> | Category: {activity.category}</span>}
                        {activity.name && <span> | Name: {activity.name}</span>}
                        {activity.job && <span> | Job: {activity.job}</span>}
                        {activity.status && <span> | Status: {activity.status}</span>}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{activity.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Applications Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
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
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
