import * as z from "zod";

// zod schema 
export const userValidator = z.object({
  email: z
    .string()
    .email()
    .toLowerCase().trim(),
  password: z
    .string()
    .min(8, {
      message : "require more than 8 characters"
    },)
    .regex(/[a-z]/)
    .regex(/[A-Z]/, {
      message: 'require at least one uppercase letter',
    })
    .regex(/[0-9]/, {
      message: 'require at least one number letter',
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: 'require at least one special character letter',
    }),
    username : z.string().min(3, {message: 'require more than 3 characters'})
});

// create an interface for this schema
export type User = z.infer<typeof userValidator>;