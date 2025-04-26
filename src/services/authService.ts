
import { apiRequest } from './api';
import { AuthUser } from '@/contexts/AuthContext';

// Types for API responses
export interface LoginResponse {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  role: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  contactNum?: string;
  country?: string;
  city?: string;
  pincode?: string;
  state?: string;
  street?: string;
}

/**
 * Authenticate user with email and password
 */
export async function login(email: string, password: string): Promise<LoginResponse> {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
    requiresAuth: false
  });
}

/**
 * Register a new user
 */
export async function register(userData: RegisterData): Promise<any> {
  return apiRequest('/auth/signin', {
    method: 'POST',
    body: userData,
    requiresAuth: false
  });
}
