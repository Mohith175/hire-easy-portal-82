
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/common/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { Job, JobCategory, getJobs, getJobCategories } from "@/services/jobService";
import JobFilters from "@/components/jobs/JobFilters";
import JobCard from "@/components/jobs/JobCard";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");

  // Fetch jobs
  const { data: jobs, isLoading: jobsLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs
  });

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['jobCategories'],
    queryFn: getJobCategories
  });

  // Get unique locations from jobs
  const locations = React.useMemo(() => {
    if (!jobs) return [];
    const uniqueLocations = [...new Set(jobs.map(job => `${job.city}, ${job.country}`))];
    return uniqueLocations.sort();
  }, [jobs]);

  // Filter jobs based on search and filters
  const filteredJobs = React.useMemo(() => {
    if (!jobs) return [];
    
    return jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || job.jobcategoryId.toString() === selectedCategory;
      const matchesLocation = !selectedLocation || `${job.city}, ${job.country}` === selectedLocation;
      const matchesJobType = !selectedJobType || job.jobType === selectedJobType;
      
      return matchesSearch && matchesCategory && matchesLocation && matchesJobType;
    });
  }, [jobs, searchTerm, selectedCategory, selectedLocation, selectedJobType]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedLocation("");
    setSelectedJobType("");
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/90 to-primary text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Job</h1>
          <p className="text-lg opacity-90 mb-8">
            Browse through thousands of job listings and find the one that matches your skills and aspirations.
          </p>
          
          {/* Filters */}
          <div className="bg-white rounded-lg p-6 shadow-lg animate-fade-in">
            <JobFilters
              onSearch={setSearchTerm}
              onCategoryChange={setSelectedCategory}
              onLocationChange={setSelectedLocation}
              onJobTypeChange={setSelectedJobType}
              categories={categories || []}
              locations={locations}
              selectedCategory={selectedCategory}
              selectedLocation={selectedLocation}
              selectedJobType={selectedJobType}
              searchTerm={searchTerm}
              onClearFilters={clearFilters}
            />
          </div>
        </div>
      </div>

      {/* Jobs List Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">
            {filteredJobs.length} Jobs Found
          </h2>
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {jobs?.length || 0} jobs
          </p>
        </div>

        {jobsLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-12 w-12 rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search filters or check back later for new opportunities.
            </p>
            <button
              onClick={clearFilters}
              className="text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 animate-fade-in">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                categoryTitle={categories?.find(c => c.id === job.jobcategoryId)?.title || "Unknown Category"}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Jobs;
