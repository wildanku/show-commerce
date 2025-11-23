export interface Tenant {
  id: number;
  name: string;
  slug: string;
  status: 'active' | 'inactive';
  logo?: string;
  timezone?: string;
  currency?: string;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  duration: number; // in minutes
  price: number; // in cents
  is_online: boolean;
  status: 'active' | 'inactive';
}

export interface Staff {
  id: number;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive';
}

export interface TimeSlot {
  time: string;
  available: boolean;
  staff_id?: number;
}

export interface BookingFormData {
  tenant_id?: number;
  service_id: number;
  staff_id?: number;
  date: string;
  time: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  notes?: string;
}

export interface BookingStep {
  step: 'tenant' | 'service' | 'staff' | 'datetime' | 'details' | 'confirm';
  title: string;
  completed: boolean;
}

export type BookingFlow = 'auto' | 'service_first' | 'tenant_first';
export type EntryType =
  | 'split_start'
  | 'service_first'
  | 'tenant_first'
  | 'skip_tenant_selection';
