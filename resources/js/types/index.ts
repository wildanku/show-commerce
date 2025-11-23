export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
}

export interface PageProps {
  auth: {
    user: User | null;
  };
  flash?: {
    message?: string;
    error?: string;
  };
  errors?: Record<string, string>;
}
