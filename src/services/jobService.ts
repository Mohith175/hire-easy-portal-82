import { supabase } from "@/integrations/supabase/client";

export interface Job {
  id: string;
  title: string;
  company_name: string;
  description: string;
  job_type: string;
  location: string;
  salary_range: string | null;
  created_at: string;
  employer_id: string | null;
  // Additional fields that are referenced in components but not in DB yet
  city?: string;
  country?: string;
  experience?: string;
  skills?: string;
  jobcategoryId?: string; // Changed from number to string
  companyName?: string; // Alias for company_name
  jobDescription?: string; // Alias for description
  jobType?: string; // Alias for job_type
  salaryRange?: string; // Alias for salary_range
}

export interface JobCategory {
  id: string; // Changed from number to string
  title: string;
  description: string;
}

export interface Resume {
  id: string;
  file_name: string;
  file_url: string;
  user_id: string;
  uploaded_at: string;
  fileName?: string; // Alias for file_name
}

export type ApplicationStatus = "pending" | "reviewing" | "shortlisted" | "selected" | "rejected";

export interface JobApplication {
  id: string;
  status: ApplicationStatus;
  created_at: string;
  user_id: string;
  job_id: string;
  resume_id: string;
  // Additional fields for UI components
  jobId?: string; // Alias for job_id
  jobTitle?: string;
  appliedDate?: string; // Alias for created_at
  feedback?: string;
  userName?: string;
}

export const getJobs = async () => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  // Map DB column names to component property names
  return data.map(job => ({
    ...job,
    companyName: job.company_name,
    jobDescription: job.description,
    jobType: job.job_type,
    salaryRange: job.salary_range,
    // Extract city and country from location field if needed
    city: job.location?.split(',')[0]?.trim(),
    country: job.location?.split(',')[1]?.trim() || job.location,
    // Default values for fields referenced in components
    skills: "Not specified",
    experience: "Not specified",
    jobcategoryId: "1" // Adding default jobcategoryId as string
  }));
};

export const getJobById = async (id: string) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  
  return {
    ...data,
    companyName: data.company_name,
    jobDescription: data.description,
    jobType: data.job_type,
    salaryRange: data.salary_range,
    city: data.location?.split(',')[0]?.trim(),
    country: data.location?.split(',')[1]?.trim() || data.location,
    skills: "Not specified",
    experience: "Not specified"
  };
};

export const getUserResumes = async (userId: string) => {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', userId)
    .order('uploaded_at', { ascending: false });

  if (error) throw error;
  
  return data.map(resume => ({
    ...resume,
    fileName: resume.file_name
  }));
};

export const uploadResume = async (userId: string, file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Math.random()}.${fileExt}`;

  const { error: uploadError, data } = await supabase.storage
    .from('resumes')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('resumes')
    .getPublicUrl(fileName);

  const { data: resume, error: dbError } = await supabase
    .from('resumes')
    .insert({
      file_name: file.name,
      file_url: publicUrl,
      user_id: userId,
    })
    .select()
    .single();

  if (dbError) throw dbError;
  return resume;
};

export const deleteResume = async (resumeId: string) => {
  const { error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', resumeId);

  if (error) throw error;
  return true;
};

export const applyForJob = async (userId: string, jobId: string, resumeId: string) => {
  const { data, error } = await supabase
    .from('applications')
    .insert({
      user_id: userId,
      job_id: jobId,
      resume_id: resumeId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserApplications = async (userId: string) => {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      jobs:job_id (title, company_name)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  return data.map(app => ({
    ...app,
    jobId: app.job_id,
    jobTitle: app.jobs?.title || 'Unknown Job',
    appliedDate: app.created_at
  }));
};

export const getUserJobs = async (userId: string) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('employer_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  return data.map(job => ({
    ...job,
    companyName: job.company_name,
    jobDescription: job.description,
    jobType: job.job_type,
    salaryRange: job.salary_range,
    city: job.location?.split(',')[0]?.trim(),
    country: job.location?.split(',')[1]?.trim() || job.location,
    skills: "Not specified",
    experience: "Not specified"
  }));
};

export const getJobApplications = async (jobId: string) => {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      users:user_id (id, email)
    `)
    .eq('job_id', jobId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  return data.map(app => ({
    ...app,
    userName: app.users?.email || 'Anonymous User',
    appliedDate: app.created_at,
    status: (app.status || 'pending') as ApplicationStatus
  }));
};

// Mock functions for job categories until they're implemented in the database
export const getJobCategories = async (): Promise<JobCategory[]> => {
  return [
    { id: "1", title: 'Technology', description: 'Software development, IT, and technical roles' },
    { id: "2", title: 'Design', description: 'UX/UI, graphic design, and creative roles' },
    { id: "3", title: 'Marketing', description: 'Digital marketing, content creation, and brand management' },
    { id: "4", title: 'Business', description: 'Business development, sales, and management roles' },
    { id: "5", title: 'Customer Service', description: 'Customer support and service roles' }
  ];
};

export const createJobCategory = async (category: { title: string; description: string }): Promise<JobCategory> => {
  // Mock implementation
  return { id: String(Math.floor(Math.random() * 1000) + 6), ...category };
};

export const updateJobCategory = async (id: string, category: Partial<JobCategory>): Promise<JobCategory> => {
  // Mock implementation
  return { id, title: category.title || '', description: category.description || '' };
};

export const deleteJobCategory = async (id: string): Promise<boolean> => {
  // Mock implementation
  return true;
};

export const searchJobs = async (searchTerm: string) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  return data.map(job => ({
    ...job,
    companyName: job.company_name,
    jobDescription: job.description,
    jobType: job.job_type,
    salaryRange: job.salary_range,
    city: job.location?.split(',')[0]?.trim(),
    country: job.location?.split(',')[1]?.trim() || job.location,
    skills: "Not specified",
    experience: "Not specified"
  }));
};

export const createJob = async (jobData: Omit<Job, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('jobs')
    .insert({
      title: jobData.title,
      company_name: jobData.companyName || jobData.company_name,
      description: jobData.jobDescription || jobData.description,
      job_type: jobData.jobType || jobData.job_type,
      location: jobData.location || `${jobData.city}, ${jobData.country}`,
      salary_range: jobData.salaryRange || jobData.salary_range,
      employer_id: jobData.employer_id
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};
