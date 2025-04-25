import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, DollarSign, CalendarDays } from "lucide-react";
import MainLayout from "@/components/common/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { getUserJobs } from "@/services/jobService";

const MyJobs = () => {
  const { user } = useAuth();
  
  const { data: jobs, isLoading } = useQuery({
    queryKey: ['userJobs', user?.id?.toString()],
    queryFn: () => user ? getUserJobs(user.id.toString()) : Promise.resolve([]),
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>My Posted Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            {jobs && jobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <Link key={job.id} to={`/jobs/${job.id}`} className="block">
                    <div className="border rounded-md p-4 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                      <div className="text-sm text-gray-600 mb-2">{job.companyName || job.company_name}</div>
                      <div className="flex flex-wrap items-center text-sm text-gray-500 gap-y-1">
                        <span className="flex items-center mr-4">
                          <MapPin size={14} className="mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center mr-4">
                          <Briefcase size={14} className="mr-1" />
                          {job.jobType || job.job_type}
                        </span>
                        <span className="flex items-center mr-4">
                          <DollarSign size={14} className="mr-1" />
                          {job.salaryRange || job.salary_range}
                        </span>
                        <span className="flex items-center">
                          <CalendarDays size={14} className="mr-1" />
                          Posted {new Date(job.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">You haven't posted any jobs yet.</p>
                <Button asChild>
                  <Link to="/jobs/post">Post a Job</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default MyJobs;
