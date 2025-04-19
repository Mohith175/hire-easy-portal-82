
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, CreditCard, Briefcase, Calendar } from "lucide-react";
import { Job } from "@/services/jobService";

interface JobCardProps {
  job: Job;
  categoryTitle: string;
}

const JobCard: React.FC<JobCardProps> = ({ job, categoryTitle }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              <Link to={`/jobs/${job.id}`}>{job.title}</Link>
            </h3>
            <div className="flex items-center text-gray-600">
              <Building size={16} className="mr-2" />
              <span>{job.companyName}</span>
            </div>
          </div>
          <Badge className="mt-2 md:mt-0" variant="secondary">
            {job.jobType}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2 shrink-0" />
            <span>{job.city}, {job.country}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CreditCard size={16} className="mr-2 shrink-0" />
            <span>{job.salaryRange}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Briefcase size={16} className="mr-2 shrink-0" />
            <span>{job.experience}</span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{job.jobDescription}</p>

        <div className="flex flex-wrap gap-2">
          {job.skills.split(',').slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-primary/5">
              {skill.trim()}
            </Badge>
          ))}
          {job.skills.split(',').length > 4 && (
            <Badge variant="outline" className="bg-primary/5">
              +{job.skills.split(',').length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 flex justify-between items-center p-4">
        <div className="text-sm text-gray-500 flex items-center">
          <Calendar size={16} className="mr-2" />
          <span>Category: {categoryTitle}</span>
        </div>
        <Link to={`/jobs/${job.id}`}>
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
