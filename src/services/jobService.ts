
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
}

export interface Resume {
  id: string;
  file_name: string;
  file_url: string;
  user_id: string;
  uploaded_at: string;
}

export type ApplicationStatus = "pending" | "reviewing" | "shortlisted" | "selected" | "rejected";

export interface JobApplication {
  id: string;
  status: ApplicationStatus;
  created_at: string;
  user_id: string;
  job_id: string;
  resume_id: string;
}

export const getJobs = async () => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getUserResumes = async (userId: string) => {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', userId)
    .order('uploaded_at', { ascending: false });

  if (error) throw error;
  return data;
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
