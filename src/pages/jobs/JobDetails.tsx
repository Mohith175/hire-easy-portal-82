
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, CalendarDays } from "lucide-react";
import MainLayout from "@/components/common/MainLayout";
import JobApplicationForm from "@/components/jobs/JobApplicationForm";
import { getJobById } from "@/services/jobService";
import { Job } from "@/services/jobService";

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [showApplication, setShowApplication] = useState(false);

  const { data: job, isLoading, error } = useQuery<Job>({
    queryKey: ['job', id],
    queryFn: () => getJobById(id as string),
    enabled: !!id,
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

  if (error || !job) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">
                Job not found or error loading job details.
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Job Details Section */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="space-y-4">
                  <CardTitle className="text-2xl font-bold">
                    {job?.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {job?.job_type}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {job?.location}
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      Posted {job && new Date(job.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  {job?.salary_range && (
                    <Badge variant="secondary" className="text-sm">
                      {job.salary_range}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Company
                  </h3>
                  <p>{job?.company_name}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Job Description
                  </h3>
                  <div className="prose max-w-none">
                    {job?.description}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Section */}
          <div>
            {job && (
              <JobApplicationForm 
                jobId={job.id} 
                jobTitle={job.title} 
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobDetails;
