
import React from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError() as any;
  const navigate = useNavigate();

  const errorMessage = error?.message || "An unexpected error occurred";
  const errorStatus = error?.status || 500;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 text-center">
        <div className="flex justify-center">
          <div className="p-3 rounded-full bg-red-100">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900">
          Oops! Something went wrong
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-gray-500 mb-4">
            {errorStatus === 404 
              ? "The page you're looking for doesn't exist."
              : "We encountered an error while processing your request."}
          </p>
          
          <div className="p-4 bg-red-50 rounded-md mb-6 text-left">
            <p className="text-sm font-mono text-red-700 break-all">
              {errorMessage}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline"
              className="flex items-center"
              onClick={() => navigate(-1)}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            
            <Link to="/">
              <Button className="flex items-center w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Button>
            </Link>
          </div>
        </div>
        
        <p className="text-sm text-gray-500">
          If this problem persists, please contact support.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
