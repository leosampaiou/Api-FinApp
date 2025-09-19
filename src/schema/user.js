import { z } from 'zod'

export const createUserSchema = z.object({
    first_name: z.string().trim().min(1, {
        message: 'First name is required',
    }),
    last_name: z.string().trim().min(1, {
        message: 'Last name is required',
    }),
    email: z.email().min(1, {
        message: 'Email is required',
    }),
    password: z
        .string({
            required_error: 'Password is required',
        })
        .trim()
        .min(6),
})

export const updatedUserSchema = createUserSchema.partial().strict()
