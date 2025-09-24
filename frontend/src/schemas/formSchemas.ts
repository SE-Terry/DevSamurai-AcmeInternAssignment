import { z } from 'zod'

// Organization schemas
export const renameOrganizationSchema = z.object({
  name: z.string()
    .min(1, 'Organization name is required')
    .max(50, 'Organization name must be less than 50 characters')
    .trim()
})

// User schemas  
export const renameUserSchema = z.object({
  displayName: z.string()
    .min(1, 'Display name is required')
    .max(30, 'Display name must be less than 30 characters')
    .trim()
})

// Auth schemas
export const signInSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type RenameOrganizationForm = z.infer<typeof renameOrganizationSchema>
export type RenameUserForm = z.infer<typeof renameUserSchema>
export type SignInForm = z.infer<typeof signInSchema>
export type SignUpForm = z.infer<typeof signUpSchema>
