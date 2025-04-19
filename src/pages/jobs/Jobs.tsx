
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/common/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  MapPin,
  Briefcase,
  Search,
  Filter,
  Building,
  CalendarDays,
  ArrowRight,
  X,
  DollarSign,
} from "lucide-react";

// Sample jobs data
const jobsData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechSolutions Inc.",
    logo: "T",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110K - $130K",
    postedDate: "2 days ago",
    description: "We're looking for a Senior Frontend Developer with 5+ years of experience in React and modern JavaScript frameworks to join our team.",
    category: "IT & Software",
    tags: ["React", "JavaScript", "TypeScript", "Redux", "HTML/CSS"]
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Creative Designs",
    logo: "C",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$90K - $110K",
    postedDate: "3 days ago",
    description: "Join our creative team as a UX/UI Designer to create beautiful and intuitive user experiences for our products and clients.",
    category: "Design",
    tags: ["Figma", "Adobe XD", "UI Design", "User Research", "Prototyping"]
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Innovate Labs",
    logo: "I",
    location: "Remote",
    type: "Full-time",
    salary: "$100K - $120K",
    postedDate: "1 week ago",
    description: "We're seeking a Full Stack Developer proficient in both frontend and backend technologies to help build our next-generation applications.",
    category: "IT & Software",
    tags: ["JavaScript", "Node.js", "React", "MongoDB", "AWS"]
  },
  {
    id: 4,
    title: "Product Manager",
    company: "GrowthTech",
    logo: "G",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$120K - $140K",
    postedDate: "5 days ago",
    description: "Looking for an experienced Product Manager to lead our product development efforts and work closely with engineering and design teams.",
    category: "Management",
    tags: ["Product Strategy", "Agile", "User Stories", "Roadmapping"]
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudNative",
    logo: "C",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$115K - $135K",
    postedDate: "1 week ago",
    description: "Join our team as a DevOps Engineer to build and maintain our cloud infrastructure and CI/CD pipelines.",
    category: "IT & Software",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD", "Infrastructure as Code"]
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "DataInsights",
    logo: "D",
    location: "Remote",
    type: "Full-time",
    salary: "$130K - $150K",
    postedDate: "2 weeks ago",
    description: "We're looking for a Data Scientist with strong machine learning experience to help us extract insights from our data and build predictive models.",
    category: "Data Science",
    tags: ["Python", "Machine Learning", "SQL", "Data Visualization", "Statistics"]
  },
  {
    id: 7,
    title: "Mobile Developer (iOS)",
    company: "AppWorks",
    logo: "A",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$100K - $120K",
    postedDate: "4 days ago",
    description: "Looking for an iOS Developer with Swift experience to join our mobile app development team.",
    category: "Mobile Development",
    tags: ["Swift", "iOS", "Objective-C", "Mobile Architecture", "RESTful APIs"]
  },
  {
    id: 8,
    title: "Content Marketing Specialist",
    company: "ContentPro",
    logo: "C",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$70K - $85K",
    postedDate: "1 week ago",
    description: "Join our marketing team to create compelling content that drives engagement and conversions.",
    category: "Marketing",
    tags: ["Content Strategy", "SEO", "Social Media", "Analytics", "Copywriting"]
  },
  {
    id: 9,
    title: "Frontend Developer",
    company: "WebTech",
    logo: "W",
    location: "Remote",
    type: "Contract",
    salary: "$60 - $80/hour",
    postedDate: "3 days ago",
    description: "Looking for a contract Frontend Developer to help us build modern, responsive web applications.",
    category: "IT & Software",
    tags: ["HTML/CSS", "JavaScript", "React", "Responsive Design"]
  },
  {
    id: 10,
    title: "HR Manager",
    company: "PeopleFirst",
    logo: "P",
    location: "Denver, CO",
    type: "Full-time",
    salary: "$90K - $110K",
    postedDate: "2 weeks ago",
    description: "We're seeking an experienced HR Manager to oversee all aspects of human resources for our growing company.",
    category: "Human Resources",
    tags: ["Recruiting", "Employee Relations", "Benefits", "Compliance", "Training"]
  },
];

// Categories
const categories = [
  "IT & Software",
  "Design",
  "Marketing",
  "Data Science",
  "Mobile Development",
  "Management",
  "Human Resources",
  "Sales",
  "Customer Service",
  "Finance",
];

// Job types
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

const Jobs = () => {
  const [jobs, setJobs] = useState(jobsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [salaryRange, setSalaryRange] = useState([40, 150]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API with the search parameters
    // For now, we'll just filter the sample data
    filterJobs();
  };

  const filterJobs = () => {
    let filteredJobs = jobsData;

    // Filter by search term
    if (searchTerm) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        selectedCategories.includes(job.category)
      );
    }

    // Filter by job types
    if (selectedJobTypes.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        selectedJobTypes.includes(job.type)
      );
    }

    // Filter by salary range (this is simplified, as our data doesn't have numeric salary values)
    // In a real app, you'd have more precise salary filtering

    setJobs(filteredJobs);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleJobType = (type: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedJobTypes([]);
    setSalaryRange([40, 150]);
    setJobs(jobsData);
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
            <p className="text-xl text-gray-600 mb-8">
              Browse thousands of job listings to find the perfect opportunity for your career
            </p>
            
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-6 w-full rounded-lg"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className="md:w-auto py-6 px-4 flex items-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={20} className="mr-2" />
                Filters
              </Button>
              
              <Button type="submit" className="md:w-auto py-6 px-6">
                Search Jobs
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className={`lg:w-1/4 lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="text-sm text-primary">
                    Reset All
                  </Button>
                </div>

                {/* Categories Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Job Categories</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Job Type Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Job Type</h3>
                  <div className="space-y-2">
                    {jobTypes.map((type) => (
                      <div key={type} className="flex items-center">
                        <Checkbox
                          id={`type-${type}`}
                          checked={selectedJobTypes.includes(type)}
                          onCheckedChange={() => toggleJobType(type)}
                        />
                        <label
                          htmlFor={`type-${type}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Salary Range Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Salary Range (K/year)</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={salaryRange}
                      max={200}
                      min={0}
                      step={5}
                      value={salaryRange}
                      onValueChange={setSalaryRange}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm">
                      <span>${salaryRange[0]}K</span>
                      <span>${salaryRange[1]}K</span>
                    </div>
                  </div>
                </div>

                <Button onClick={filterJobs} className="w-full">
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {jobs.length} Job{jobs.length !== 1 ? "s" : ""} Found
              </h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="relevant">Most Relevant</SelectItem>
                    <SelectItem value="salary-high">Salary (High to Low)</SelectItem>
                    <SelectItem value="salary-low">Salary (Low to High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Applied Filters */}
            {(selectedCategories.length > 0 || selectedJobTypes.length > 0 || searchTerm) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {searchTerm && (
                  <div className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full flex items-center">
                    <span>"{searchTerm}"</span>
                    <button 
                      onClick={() => {
                        setSearchTerm("");
                        filterJobs();
                      }}
                      className="ml-2"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {selectedCategories.map((category) => (
                  <div 
                    key={category} 
                    className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full flex items-center"
                  >
                    <span>{category}</span>
                    <button 
                      onClick={() => {
                        toggleCategory(category);
                        filterJobs();
                      }}
                      className="ml-2"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                {selectedJobTypes.map((type) => (
                  <div 
                    key={type} 
                    className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full flex items-center"
                  >
                    <span>{type}</span>
                    <button 
                      onClick={() => {
                        toggleJobType(type);
                        filterJobs();
                      }}
                      className="ml-2"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Jobs List */}
            {jobs.length > 0 ? (
              <div className="space-y-6 animate-fade-in">
                {jobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center">
                        <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center mr-4 mb-4 md:mb-0">
                          {job.logo}
                        </div>
                        <div className="flex-grow">
                          <Link to={`/jobs/${job.id}`} className="hover:text-primary">
                            <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                          </Link>
                          <div className="text-gray-700 mb-2">{job.company}</div>
                          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-3 gap-y-1">
                            <span className="flex items-center mr-4">
                              <MapPin size={14} className="mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center mr-4">
                              <Briefcase size={14} className="mr-1" />
                              {job.type}
                            </span>
                            <span className="flex items-center mr-4">
                              <DollarSign size={14} className="mr-1" />
                              {job.salary}
                            </span>
                            <span className="flex items-center">
                              <CalendarDays size={14} className="mr-1" />
                              {job.postedDate}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {job.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {job.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="md:ml-4 mt-4 md:mt-0 flex justify-start md:justify-end">
                          <Link to={`/jobs/${job.id}`}>
                            <Button variant="outline" size="sm">
                              View Details <ArrowRight size={14} className="ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}

            {/* Pagination */}
            {jobs.length > 0 && (
              <div className="flex justify-center mt-10">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button size="sm" variant="default">1</Button>
                  <Button size="sm" variant="outline">2</Button>
                  <Button size="sm" variant="outline">3</Button>
                  <Button size="sm" variant="outline">
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Jobs;
