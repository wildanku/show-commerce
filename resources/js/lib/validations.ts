import { z } from 'zod';

export const BookingFormSchema = z.object({
  tenant_id: z.number().optional(),
  service_id: z.number({
    message: 'Please select a service',
  }),
  staff_id: z.number().optional(),
  date: z
    .string({
      message: 'Please select a date',
    })
    .min(1, 'Please select a date'),
  time: z
    .string({
      message: 'Please select a time',
    })
    .min(1, 'Please select a time'),
  customer_name: z
    .string({
      message: 'Name is required',
    })
    .min(2, 'Name must be at least 2 characters'),
  customer_email: z
    .string({
      message: 'Email is required',
    })
    .email('Please enter a valid email address'),
  customer_phone: z
    .string({
      message: 'Phone number is required',
    })
    .min(10, 'Please enter a valid phone number'),
  notes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof BookingFormSchema>;
