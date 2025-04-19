import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ApplicationStatus as StatusType } from "@/services/jobService";
import { Check, Clock, X, Award, Activity } from "lucide-react";

interface ApplicationStatusProps {
  status: StatusType;
  showProgress?: boolean;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ status, showProgress = false }) => {
  // Progress percentage based on status
  const getProgressPercentage = () => {
    switch (status) {
      case "PENDING":
        return 20;
      case "REVIEWING":
        return 40;
      case "SHORTLISTED":
        return 60;
      case "SELECTED":
        return 100;
      case "REJECTED":
        return 100;
      default:
        return 0;
    }
  };

  const getBadgeVariant = () => {
    switch (status) {
      case "PENDING":
        return "outline";
      case "REVIEWING":
        return "secondary";
      case "SHORTLISTED":
        return "default";
      case "SELECTED":
        return "default"; // Changed from 'success' to 'default'
      case "REJECTED":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "PENDING":
        return <Clock size={16} className="mr-1" />;
      case "REVIEWING":
        return <Activity size={16} className="mr-1" />;
      case "SHORTLISTED":
        return <Award size={16} className="mr-1" />;
      case "SELECTED":
        return <Check size={16} className="mr-1" />;
      case "REJECTED":
        return <X size={16} className="mr-1" />;
      default:
        return null;
    }
  };

  const getBadgeText = () => {
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  return (
    <div className="space-y-2">
      <Badge variant={getBadgeVariant()} className="flex items-center">
        {getStatusIcon()}
        {getBadgeText()}
      </Badge>
      
      {showProgress && (
        <div className="space-y-1">
          <Progress value={getProgressPercentage()} className="h-2" />
          <p className="text-xs text-gray-500">
            Application Progress: {getProgressPercentage()}%
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;
