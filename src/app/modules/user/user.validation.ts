import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    profile: z.object({
      name: z.string({
        required_error: 'Name is required',
      }),
      gender: z.string({ required_error: 'Gender is required' }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      phone: z.string({
        required_error: 'phone number is required',
      }),

      address: z.string({
        required_error: 'Address is required',
      }),

      profileImage: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
