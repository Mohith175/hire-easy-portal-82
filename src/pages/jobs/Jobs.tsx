import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/common/MainLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Job, JobCategory, getJobs, getJobCategories } from "@/services/jobService";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  MapPin,
  Briefcase,
  CreditCard,
  Award,
  Filter,
  Clock,
  Building,
  ChevronDown,
  ChevronUp,
  Calendar
} from "lucide-react";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedJobType, setSelectedJobType] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: jobs = [], isLoading, error, refetch } = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs
  });
  
  const { data: categories = [] } = useQuery({
    queryKey: ['jobCategories'],
    queryFn: getJobCategories
  });
  
  const uniqueLocations = React.useMemo(() => {
    const locations = jobs.map(job => `${job.city || ''}, ${job.country || ''}`).filter(loc => loc !== ', ');
    return [...new Set(locations)].sort();
  }, [jobs]);
  
  const filteredJobs = React.useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || 
        job.id.toString() === selectedCategory;
      
      const matchesLocation = !selectedLocation || 
        `${job.city || ''}, ${job.country || ''}`.toLowerCase().includes(selectedLocation.toLowerCase());
      
      const matchesJobType = !selectedJobType || job.job_type.toLowerCase() === selectedJobType.toLowerCase();
      
      return matchesSearch && matchesCategory && matchesLocation && matchesJobType;
    });
  }, [jobs, searchTerm, selectedCategory, selectedLocation, selectedJobType]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search results",
      description: `Found ${filteredJobs.length} jobs matching your criteria.`,
    });
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedLocation("");
    setSelectedJobType("");
  };
  
  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-primary to-secondary/70 text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">Find Your Perfect Job</h1>
          
          <form onSubmit={handleSearch} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative col-span-full md:col-span-1">
                <Input
                  placeholder="Job title, keywords, or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white text-gray-800"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              </div>
              
              <div>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="bg-white text-gray-800">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-gray-500" />
                      <SelectValue placeholder="Any Location" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Location</SelectItem>
                    {uniqueLocations.map((location, index) => (
                      <SelectItem key={index} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="bg-white text-primary hover:bg-gray-100">
                <Search size={18} className="mr-2" />
                Search Jobs
              </Button>
            </div>
            
            <div className="mt-4">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setShowFilters(!showFilters)}
                className="text-white hover:bg-white/20"
              >
                <Filter size={16} className="mr-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
                {showFilters ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
              </Button>
              
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-white/10 rounded-md">
                  <div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="bg-white text-gray-800">
                        <div className="flex items-center">
                          <Briefcase size={16} className="mr-2 text-gray-500" />
                          <SelectValue placeholder="Any Category" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Category</SelectItem>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                      <SelectTrigger className="bg-white text-gray-800">
                        <div className="flex items-center">
                          <Clock size={16} className="mr-2 text-gray-500" />
                          <SelectValue placeholder="Any Job Type" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Job Type</SelectItem>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={clearFilters}
                    className="bg-transparent border-white text-white hover:bg-white/20"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
          </h2>
          <div className="text-sm text-gray-500">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-8 w-8 rounded-full border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-xl font-medium text-gray-900 mb-2">Failed to load jobs</p>
              <p className="text-gray-500">Please try again later or contact support if the problem persists.</p>
              <Button className="mt-4" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : filteredJobs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Briefcase className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-xl font-medium text-gray-900 mb-2">No jobs found</p>
              <p className="text-gray-500">Try adjusting your search filters or check back later for new opportunities.</p>
              <Button className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} categories={categories || []} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/jobs/post">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Briefcase className="mr-2 h-5 w-5" />
              Post a New Job
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

interface JobCardProps {
  job: Job;
  categories: JobCategory[];
}

const JobCard: React.FC<JobCardProps> = ({ job, categories }) => {
  const categoryName = "Category";
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold hover:text-primary transition-colors duration-300">
                  <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                </h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <Building size={16} className="mr-2" />
                  <span>{job.company_name}</span>
                </div>
              </div>
              <div className="mt-2 md:mt-0">
                <Badge className="bg-primary-100 text-primary border-primary">
                  {job.job_type}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-2 text-gray-500" />
                <span>{job.city || ''}, {job.country || ''}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <CreditCard size={16} className="mr-2 text-gray-500" />
                <span>{job.salary_range || 'Not specified'}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Award size={16} className="mr-2 text-gray-500" />
                <span>{job.experience || 'Not specified'}</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {job.skills?.split(',').map((skill, index) => (
                <Badge key={index} variant="outline" className="bg-gray-100">
                  {skill.trim()}
                </Badge>
              )) || <span className="text-gray-500">No skills listed</span>}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 flex justify-between items-center">
        <div className="text-sm text-gray-500 flex items-center">
          <Calendar size={16} className="mr-2" />
          <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
        </div>
        <Link to={`/jobs/${job.id}`}>
          <Button variant="outline">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Jobs;
