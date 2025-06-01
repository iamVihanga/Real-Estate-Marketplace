import { z } from 'zod'

export const propertyInquirySchema = z.object({
  propertyId: z.string(),
  agentId: z.number(),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }),
  message: z
    .string()
    .min(1, { message: 'Please include a message' })
    .max(256, { message: 'Message must be at most 256 characters long' }),
})

export type PropertyInquirySchema = z.infer<typeof propertyInquirySchema>
