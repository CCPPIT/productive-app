import {z} from  'zod'
export const signUpSchema=z.object({
    email:z.string().email("Please enter a valid email"),
    password:z.string().min(10,"Please must be at last 10 characters"),
    username:z.string().min(2,"min length ")
})
export type SignUpSchema=z.infer<typeof signUpSchema>;