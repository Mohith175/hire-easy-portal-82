
import { apiRequest } from './api';

export interface InterviewRequest {
  id?: string;
  applicationId: string;
  employerId: string;
  applicantId: string;
  scheduledTime: string;
  status?: 'pending' | 'accepted' | 'declined';
  jobTitle?: string;
  applicantName?: string;
}

export const scheduleInterview = (employerId: string, applicationId: string, data: Omit<InterviewRequest, 'id' | 'employerId' | 'applicationId'>) => {
  return apiRequest<InterviewRequest>(`/employers/${employerId}/applications/${applicationId}/schedule`, {
    method: 'POST',
    body: data
  });
};

export const getEmployerInterviews = (employerId: string) => {
  return apiRequest<InterviewRequest[]>(`/employers/${employerId}/interviews`);
};

export const updateInterviewStatus = (employerId: string, interviewId: string, status: 'accepted' | 'declined') => {
  return apiRequest<InterviewRequest>(`/employers/${employerId}/interviews/${interviewId}/status`, {
    method: 'POST',
    body: { status }
  });
};
