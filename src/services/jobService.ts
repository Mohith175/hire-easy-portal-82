
import { apiRequest } from './api';

export interface JobCategory {
  id: string;
  title: string;
  description: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  company_name: string;
  location: string;
  job_type: string;
  salary_range?: string;
  employer_id: string;
  created_at: string;
  experience?: string;
  skills?: string;
  city?: string;
  country?: string;
}

export type ApplicationStatus = 'pending' | 'reviewing' | 'selected' | 'rejected' | 'shortlisted';

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  appliedDate: string;
  resumeId: string;
  feedback?: string;
  jobTitle?: string;
}

export interface Resume {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  userId: string;
}

// Job Categories API
export const getJobCategories = () => {
  return apiRequest<JobCategory[]>('/jobCategories');
};

export const createJobCategory = (category: Omit<JobCategory, 'id'>) => {
  return apiRequest<JobCategory>('/jobCategories', {
    method: 'POST',
    body: category,
  });
};

export const updateJobCategory = (id: string, category: Partial<JobCategory>) => {
  return apiRequest<JobCategory>(`/jobCategories/${id}`, {
    method: 'PUT',
    body: category,
  });
};

export const deleteJobCategory = (id: string) => {
  return apiRequest(`/jobCategories/${id}`, {
    method: 'DELETE',
  });
};

// Jobs API
export const getAllJobs = () => {
  return apiRequest<Job[]>('/jobs');
};

export const getJobById = (id: string) => {
  return apiRequest<Job>(`/jobs/${id}`);
};

export const getEmployerJobs = (employerId: string) => {
  return apiRequest<Job[]>(`/employers/${employerId}/jobs`);
};

export const createJob = (employerId: string, job: Omit<Job, 'id' | 'created_at' | 'employer_id'>) => {
  return apiRequest<Job>(`/employers/${employerId}/jobs`, {
    method: 'POST',
    body: job,
  });
};

export const deleteJob = (employerId: string, jobId: string) => {
  return apiRequest(`/employers/${employerId}/jobs/${jobId}`, {
    method: 'DELETE',
  });
};

// Job Applications API
export const getUserApplications = (employeeId: string) => {
  return apiRequest<JobApplication[]>(`/employees/${employeeId}/jobs/yourApplications`);
};

export const getEmployerApplications = (employerId: string) => {
  return apiRequest<JobApplication[]>(`/employers/${employerId}/myApplications`);
};

export const updateApplicationStatus = (
  employerId: string,
  applicationId: string,
  status: ApplicationStatus
) => {
  return apiRequest<JobApplication>(`/employers/${employerId}/myApplications/${applicationId}`, {
    method: 'POST',
    body: { status },
  });
};

export const applyForJob = (employeeId: string, jobId: string, resumeId: string) => {
  return apiRequest<JobApplication>(`/employees/${employeeId}/jobs/${jobId}/apply`, {
    method: 'POST',
    body: { resumeId },
  });
};

export const searchJobs = (params: {
  category?: string;
  location?: string;
  type?: string;
}) => {
  const searchParams = new URLSearchParams();
  if (params.category) searchParams.append('category', params.category);
  if (params.location) searchParams.append('location', params.location);
  if (params.type) searchParams.append('type', params.type);
  
  return apiRequest<Job[]>(`/jobs/search?${searchParams.toString()}`);
};

// Resume API
export const getUserResumes = (userId: string) => {
  return apiRequest<Resume[]>(`/employees/${userId}/resumes`);
};

export const uploadResume = (userId: string, formData: FormData) => {
  return apiRequest<Resume>(`/employees/${userId}/resumes`, {
    method: 'POST',
    body: formData,
  });
};

export const deleteResume = (userId: string, resumeId: string) => {
  return apiRequest(`/employees/${userId}/resumes/${resumeId}`, {
    method: 'DELETE',
  });
};
