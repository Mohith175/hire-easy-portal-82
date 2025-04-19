
import { apiRequest } from './api';

export interface JobCategory {
  id: number;
  title: string;
  description: string;
}

export interface Job {
  id: number;
  title: string;
  companyName: string;
  jobDescription: string;
  skills: string;
  jobType: string;
  salaryRange: string;
  experience: string;
  street: string;
  city: string;
  pinCode: string;
  country: string;
  logoPath: string;
  jobcategoryId: number;
  employerId: number;
}

export interface Resume {
  id: number;
  fileName: string;
  fileUrl: string;
  userId: number;
  uploadDate: string;
}

export type ApplicationStatus = "PENDING" | "REVIEWING" | "SHORTLISTED" | "SELECTED" | "REJECTED";

export interface JobApplication {
  id: number;
  status: ApplicationStatus;
  appliedDate: string;
  userId: number;
  jobId: number;
  resumeId: number;
  userName?: string;
  jobTitle?: string;
  feedback?: string;
}

// Job Category Services
export const getJobCategories = () => {
  return apiRequest<JobCategory[]>('/jobCategories');
};

export const getJobCategory = (id: number) => {
  return apiRequest<JobCategory>(`/jobCategories/${id}`);
};

export const createJobCategory = (category: Omit<JobCategory, 'id'>) => {
  return apiRequest<JobCategory>('/jobCategories', {
    method: 'POST',
    body: category,
  });
};

export const updateJobCategory = (id: number, category: Partial<JobCategory>) => {
  return apiRequest<JobCategory>(`/jobCategories/${id}`, {
    method: 'PUT',
    body: category,
  });
};

export const deleteJobCategory = (id: number) => {
  return apiRequest<void>(`/jobCategories/${id}`, {
    method: 'DELETE',
  });
};

// Job Services
export const getJobs = () => {
  return apiRequest<Job[]>('/jobs');
};

export const getJob = (id: number) => {
  return apiRequest<Job>(`/jobs/${id}`);
};

export const searchJobs = (params: { query?: string; jobCategory?: string; location?: string; type?: string }) => {
  const searchParams = new URLSearchParams();
  
  if (params.query) searchParams.set('query', params.query);
  if (params.jobCategory) searchParams.set('jobCategory', params.jobCategory);
  if (params.location) searchParams.set('location', params.location);
  if (params.type) searchParams.set('type', params.type);
  
  return apiRequest<Job[]>(`/jobs/search?${searchParams.toString()}`);
};

export const getUserJobs = (userId: number) => {
  return apiRequest<Job[]>(`/users/${userId}/jobs`);
};

export const createJob = (job: Omit<Job, 'id'>) => {
  return apiRequest<Job>('/jobs', {
    method: 'POST',
    body: job,
  });
};

export const updateJob = (jobId: number, job: Partial<Job>) => {
  return apiRequest<Job>(`/jobs/${jobId}`, {
    method: 'PUT',
    body: job,
  });
};

export const deleteJob = (jobId: number) => {
  return apiRequest<void>(`/jobs/${jobId}`, {
    method: 'DELETE',
  });
};

// Resume Services
export const getUserResumes = (userId: number) => {
  return apiRequest<Resume[]>(`/users/${userId}/resumes`);
};

export const uploadResume = (userId: number, formData: FormData) => {
  return apiRequest<Resume>(`/users/${userId}/resumes`, {
    method: 'POST',
    body: formData,
    headers: {
      // Don't set Content-Type here, it will be set automatically with the boundary
    },
  });
};

export const deleteResume = (userId: number, resumeId: number) => {
  return apiRequest<void>(`/users/${userId}/resumes/${resumeId}`, {
    method: 'DELETE',
  });
};

// Job Application Services
export const getAllApplications = () => {
  return apiRequest<JobApplication[]>('/jobApplications');
};

export const getUserApplications = (userId: number) => {
  return apiRequest<JobApplication[]>(`/users/${userId}/applications`);
};

export const getJobApplications = (jobId: number) => {
  return apiRequest<JobApplication[]>(`/jobs/${jobId}/applications`);
};

export const applyForJob = (userId: number, jobId: number, resumeId: number) => {
  return apiRequest<JobApplication>(`/jobs/${jobId}/apply`, {
    method: 'POST',
    body: { userId, resumeId },
  });
};

export const updateApplicationStatus = (applicationId: number, status: ApplicationStatus, feedback?: string) => {
  return apiRequest<JobApplication>(`/jobApplications/${applicationId}/status`, {
    method: 'PUT',
    body: { status, feedback },
  });
};

export const getApplicationHistory = (userId: number) => {
  return apiRequest<JobApplication[]>(`/users/${userId}/applicationHistory`);
};
