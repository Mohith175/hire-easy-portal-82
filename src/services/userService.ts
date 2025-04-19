
import { apiRequest } from './api';

export interface Employer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNum: string;
  country: string;
  city: string;
  pincode: string;
  state: string;
  street: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNum: string;
  country: string;
  city: string;
  pinCode: string;
  state: string;
  street: string;
  registerDate: string;
}

export interface EmployeeProfile {
  id: number;
  photoPath: string;
  github: string;
  linkedin: string;
  bio: string;
  website: string;
  resumePath: string;
  employeeId: number;
}

export interface Skill {
  id: number;
  name: string;
  experience: number;
  employeeId: number;
}

export interface WorkExperience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  employeeId: number;
}

export interface Qualification {
  id: number;
  degree: string;
  startDate: string;
  endDate: string;
  employeeId: number;
}

// Employer Services
export const getEmployers = () => {
  return apiRequest<Employer[]>('/employers');
};

export const getEmployer = (id: number) => {
  return apiRequest<Employer>(`/employers/${id}`);
};

export const createEmployer = (employer: Omit<Employer, 'id'>) => {
  return apiRequest<Employer>('/employers', {
    method: 'POST',
    body: employer,
  });
};

// Employee Services
export const getEmployees = () => {
  return apiRequest<Employee[]>('/employees');
};

export const getEmployee = (id: number) => {
  return apiRequest<Employee>(`/employees/${id}`);
};

export const createEmployee = (employee: Omit<Employee, 'id'>) => {
  return apiRequest<Employee>('/employees', {
    method: 'POST',
    body: employee,
  });
};

// Employee Profile Services
export const updateEmployeeProfile = (employeeId: number, profileData: Partial<EmployeeProfile>) => {
  return apiRequest<EmployeeProfile>(`/employees/${employeeId}/profileDetails`, {
    method: 'POST',
    body: profileData,
  });
};

// Employee Skills Services
export const updateEmployeeSkills = (employeeId: number, skills: Partial<Skill>[]) => {
  return apiRequest<Skill[]>(`/employees/${employeeId}/skills`, {
    method: 'POST',
    body: skills,
  });
};

// Employee Qualifications Services
export const updateEmployeeQualifications = (employeeId: number, qualifications: Partial<Qualification>[]) => {
  return apiRequest<Qualification[]>(`/employees/${employeeId}/qualifications`, {
    method: 'POST',
    body: qualifications,
  });
};

// Employee Work Experience Services
export const updateEmployeeWorkExperiences = (employeeId: number, experiences: Partial<WorkExperience>[]) => {
  return apiRequest<WorkExperience[]>(`/employees/${employeeId}/workExperiences`, {
    method: 'POST',
    body: experiences,
  });
};
