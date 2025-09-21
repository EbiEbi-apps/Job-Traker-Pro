// FIX: Replaced placeholder content with application-specific type definitions.
// These types provide static type checking for job application data.
export type Status = 'Applied' | 'Interviewing' | 'Offered' | 'Rejected';

export type WorkLocation = 'On-site' | 'Hybrid' | 'Remote';

export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

export interface JobApplication {
  id: string;
  company: string;
  jobTitle: string;
  status: Status;
  applyDate: string; // ISO string format
  isFavorite?: boolean;
  isArchived?: boolean;
  url?: string;
  location?: string;
  workLocation?: WorkLocation;
  employmentType?: EmploymentType;
  notes?: string;
  interviewDate?: string; // ISO string format
}

export interface User {
  name: string;
  email: string;
}