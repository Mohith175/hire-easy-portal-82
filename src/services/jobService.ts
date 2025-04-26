
import { apiRequest } from './api';

// Types for job related data
export type JobStatus = "active" | "inactive" | "closed";
export type JobType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "REMOTE";
export type ApplicationStatus = "pending" | "reviewing" | "shortlisted" | "selected" | "rejected";

export interface JobCategory {
  id: string;
  title: string;
  description: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  location: string;
  salary: string;
  company: string;
  companyName: string;
  companyDescription?: string;
  postedDate: string;
  deadline: string;
  jobType: JobType;
  status: JobStatus;
  categoryId: string;
  employerId: string;
  categoryName?: string;
  applicationsCount?: number;
  salaryRange?: string;
  createdAt: string;
  city?: string;
  country?: string;
  skills?: string;
  experience?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  employeeId: string;
  resumeId: string;
  status: ApplicationStatus;
  appliedDate: string;
  feedback?: string;
  jobTitle?: string;
  employeeId_FK?: string;
}

export interface Resume {
  id: string;
  employeeId: string;
  fileName?: string;
  uploadedAt: string;
  fileUrl?: string;
}

export interface EmployeeProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  skills?: string[];
  qualifications?: Qualification[];
  workExperiences?: WorkExperience[];
}

export interface Qualification {
  id?: string;
  degree: string;
  institution: string;
  graduationYear: number;
}

export interface WorkExperience {
  id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
}

// Job Category APIs
export async function getJobCategories(): Promise<JobCategory[]> {
  return apiRequest<JobCategory[]>('/jobCategories');
}

export async function createJobCategory(category: Partial<JobCategory>): Promise<JobCategory> {
  return apiRequest<JobCategory>('/jobCategories', {
    method: 'POST',
    body: category
  });
}

export async function updateJobCategory(id: string, category: Partial<JobCategory>): Promise<JobCategory> {
  return apiRequest<JobCategory>(`/jobCategories/${id}`, {
    method: 'PUT',
    body: category
  });
}

export async function deleteJobCategory(id: string): Promise<void> {
  return apiRequest<void>(`/jobCategories/${id}`, {
    method: 'DELETE'
  });
}

// Jobs APIs
export async function getJobs(): Promise<Job[]> {
  return apiRequest<Job[]>('/jobs');
}

export async function getJobById(id: string): Promise<Job> {
  return apiRequest<Job>(`/jobs/${id}`);
}

export async function searchJobs(category?: string, location?: string, type?: string): Promise<Job[]> {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (location) params.append('location', location);
  if (type) params.append('type', type);
  
  return apiRequest<Job[]>(`/jobs/search?${params.toString()}`);
}

export async function createJob(employerId: string, job: Partial<Job>): Promise<Job> {
  return apiRequest<Job>(`/employers/${employerId}/jobs`, {
    method: 'POST',
    body: job
  });
}

export async function deleteJob(employerId: string, jobId: string): Promise<void> {
  return apiRequest<void>(`/employers/${employerId}/jobs/${jobId}`, {
    method: 'DELETE'
  });
}

export async function getEmployerJobs(employerId: string): Promise<Job[]> {
  return apiRequest<Job[]>(`/employers/${employerId}/jobs`);
}

// For MyJobs page
export async function getUserJobs(userId: string): Promise<Job[]> {
  return apiRequest<Job[]>(`/employers/${userId}/jobs`);
}

// Job Applications APIs
export async function getAllApplications(): Promise<JobApplication[]> {
  return apiRequest<JobApplication[]>('/jobs/jobApplications');
}

export async function applyForJob(employeeId: string, jobId: string, resumeId: string): Promise<JobApplication> {
  return apiRequest<JobApplication>(`/employees/${employeeId}/jobs/${jobId}/apply`, {
    method: 'POST',
    body: { resumeId }
  });
}

export async function getUserApplications(employeeId: string): Promise<JobApplication[]> {
  return apiRequest<JobApplication[]>(`/employees/${employeeId}/jobs/yourApplications`);
}

export async function getEmployerApplications(employerId: string): Promise<JobApplication[]> {
  return apiRequest<JobApplication[]>(`/employers/${employerId}/myApplications`);
}

export async function updateApplicationStatus(employerId: string, applicationId: string, status: ApplicationStatus, feedback?: string): Promise<JobApplication> {
  return apiRequest<JobApplication>(`/employers/${employerId}/myApplications/${applicationId}`, {
    method: 'POST',
    body: { status, feedback }
  });
}

// Resume APIs
export async function getUserResumes(employeeId: string): Promise<Resume[]> {
  return apiRequest<Resume[]>(`/employees/${employeeId}/resumes`);
}

export async function uploadResume(employeeId: string, file: File): Promise<Resume> {
  const formData = new FormData();
  formData.append('file', file);
  
  // For FormData we need to remove the Content-Type header so browser can set it with boundary
  return apiRequest<Resume>(`/employees/${employeeId}/resumes`, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': undefined as any
    }
  });
}

export async function deleteResume(employeeId: string, resumeId: string): Promise<void> {
  return apiRequest<void>(`/employees/${employeeId}/resumes/${resumeId}`, {
    method: 'DELETE'
  });
}

// Employee Profile APIs
export async function getEmployeeProfile(employeeId: string): Promise<EmployeeProfile> {
  return apiRequest<EmployeeProfile>(`/employees/${employeeId}`);
}

export async function updateEmployeeProfile(employeeId: string, profileData: Partial<EmployeeProfile>): Promise<EmployeeProfile> {
  return apiRequest<EmployeeProfile>(`/employees/${employeeId}/profileDetails`, {
    method: 'POST',
    body: profileData
  });
}

export async function updateEmployeeSkills(employeeId: string, skills: string[]): Promise<EmployeeProfile> {
  return apiRequest<EmployeeProfile>(`/employees/${employeeId}/skills`, {
    method: 'POST',
    body: { skills }
  });
}

export async function updateEmployeeQualifications(employeeId: string, qualifications: Qualification[]): Promise<EmployeeProfile> {
  return apiRequest<EmployeeProfile>(`/employees/${employeeId}/qualifications`, {
    method: 'POST',
    body: { qualifications }
  });
}

export async function updateEmployeeWorkExperience(employeeId: string, workExperiences: WorkExperience[]): Promise<EmployeeProfile> {
  return apiRequest<EmployeeProfile>(`/employees/${employeeId}/workExperiences`, {
    method: 'POST',
    body: { workExperiences }
  });
}
