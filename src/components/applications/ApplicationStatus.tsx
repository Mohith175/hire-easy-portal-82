import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CheckCheck, Clock, ClipboardList, AlertTriangle, X } from "lucide-react";
import { ApplicationStatus as StatusType } from "@/services/jobService";

interface ApplicationStatusProps {
  status: StatusType;
  showProgress?: boolean;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ status, showProgress = false }) => {
  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-700";
      case "reviewing":
        return "bg-blue-100 text-blue-700";
      case "shortlisted":
        return "bg-amber-100 text-amber-700";
      case "selected":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  
  const getStatusIcon = () => {
    switch (status) {
      case "pending":
        return <Clock size={14} className="mr-1" />;
      case "reviewing":
        return <ClipboardList size={14} className="mr-1" />;
      case "shortlisted":
        return <AlertTriangle size={14} className="mr-1" />;
      case "selected":
        return <CheckCheck size={14} className="mr-1" />;
      case "rejected":
        return <X size={14} className="mr-1" />;
      default:
        return <Clock size={14} className="mr-1" />;
    }
  };
  
  const getProgressValue = () => {
    switch (status) {
      case "pending":
        return 20;
      case "reviewing":
        return 40;
      case "shortlisted":
        return 60;
      case "selected":
        return 100;
      case "rejected":
        return 100;
      default:
        return 0;
    }
  };
  
  return (
    <div className="flex flex-col">
      <Badge className={`${getStatusColor()} flex w-fit items-center capitalize`}>
        {getStatusIcon()}
        {status}
      </Badge>
      
      {showProgress && (
        <div className="mt-2">
          <Progress
            value={getProgressValue()}
            className={cn(
              "h-1.5", 
              status === "rejected" ? "bg-red-100" : "bg-blue-100"
            )}
            indicator={cn(
              status === "rejected" ? "bg-red-500" : undefined
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;
