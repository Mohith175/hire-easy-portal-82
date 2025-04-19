
export interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  role?: string; // Added optional role property
}
