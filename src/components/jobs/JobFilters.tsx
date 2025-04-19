
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, MapPin, Clock, Search, Filter } from "lucide-react";

interface JobFiltersProps {
  onSearch: (searchTerm: string) => void;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
  onJobTypeChange: (type: string) => void;
  categories: { id: number; title: string }[];
  locations: string[];
  selectedCategory: string;
  selectedLocation: string;
  selectedJobType: string;
  searchTerm: string;
  onClearFilters: () => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({
  onSearch,
  onCategoryChange,
  onLocationChange,
  onJobTypeChange,
  categories,
  locations,
  selectedCategory,
  selectedLocation,
  selectedJobType,
  searchTerm,
  onClearFilters,
}) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Input
              placeholder="Search jobs, companies, or keywords"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          </div>
        </div>
        
        <div className="flex gap-4 flex-col md:flex-row">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Briefcase className="mr-2 h-4 w-4 text-gray-500" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={onLocationChange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <MapPin className="mr-2 h-4 w-4 text-gray-500" />
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedJobType} onValueChange={onJobTypeChange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Clock className="mr-2 h-4 w-4 text-gray-500" />
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" onClick={onClearFilters} className="gap-2">
          <Filter size={16} />
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default JobFilters;
