
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

export interface JobApplication {
  id: number;
  status: string;
  appliedDate: string;
  employeeId: number;
  jobId: number;
  employeeName?: string;
  jobTitle?: string;
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

export const searchJobs = (params: { jobCategory?: string; location?: string; type?: string }) => {
  const searchParams = new URLSearchParams();
  
  if (params.jobCategory) searchParams.set('jobCategory', params.jobCategory);
  if (params.location) searchParams.set('location', params.location);
  if (params.type) searchParams.set('type', params.type);
  
  return apiRequest<Job[]>(`/jobs/search?${searchParams.toString()}`);
};

export const getEmployerJobs = (employerId: number) => {
  return apiRequest<Job[]>(`/employers/${employerId}/jobs`);
};

export const createJob = (employerId: number, job: Omit<Job, 'id'>) => {
  return apiRequest<Job>(`/employers/${employerId}/jobs`, {
    method: 'POST',
    body: job,
  });
};

export const deleteJob = (employerId: number, jobId: number) => {
  return apiRequest<void>(`/employers/${employerId}/jobs/${jobId}`, {
    method: 'DELETE',
  });
};

// Job Application Services
export const getAllApplications = () => {
  return apiRequest<JobApplication[]>('/jobs/jobApplications');
};

export const getEmployerApplications = (employerId: number) => {
  return apiRequest<JobApplication[]>(`/employers/${employerId}/myApplications`);
};

export const getEmployeeApplications = (employeeId: number) => {
  return apiRequest<JobApplication[]>(`/employees/${employeeId}/jobs/yourApplications`);
};

export const applyForJob = (employeeId: number, jobId: number) => {
  return apiRequest<JobApplication>(`/employees/${employeeId}/jobs/${jobId}/apply`, {
    method: 'POST',
  });
};

export const updateApplicationStatus = (employerId: number, applicationId: number, status: string) => {
  return apiRequest<JobApplication>(`/employers/${employerId}/myApplications/${applicationId}`, {
    method: 'POST',
    body: { status },
  });
};
