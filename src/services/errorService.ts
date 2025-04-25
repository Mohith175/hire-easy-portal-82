
import { toast } from "@/components/ui/use-toast";

export interface AppError {
  message: string;
  status?: number;
  isConnectionError?: boolean;
}

/**
 * Global error handler that can be used throughout the application
 */
export const handleError = (error: any): AppError => {
  const appError: AppError = {
    message: error?.message || "An unexpected error occurred",
    status: error?.status
  };

  if (error?.isConnectionError) {
    appError.isConnectionError = true;
    appError.message = "Unable to connect to the server. Please check your internet connection or try again later.";
  }

  // Show toast notification for the error
  toast({
    title: appError.status ? `Error ${appError.status}` : "Error",
    description: appError.message,
    variant: "destructive"
  });

  return appError;
};

/**
 * Redirects to the error page for critical errors
 */
export const redirectToErrorPage = (error: any) => {
  // Create a URL with error details
  const params = new URLSearchParams();
  params.append("message", error?.message || "Unknown error");
  if (error?.status) {
    params.append("status", error.status.toString());
  }

  // Redirect to the error page
  window.location.href = `/error?${params.toString()}`;
};

/**
 * Check if we should redirect to error page based on error severity
 */
export const shouldRedirectToErrorPage = (error: any): boolean => {
  // Redirect on connection errors or server errors (500+)
  return error?.isConnectionError || (error?.status && error.status >= 500);
};
