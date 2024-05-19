import { z } from 'zod';

export const userPermissionZodSchema = z.object({
  body: z.object({
    permissions: z.array(z.number({ required_error: 'This is required' })),
  }),
});
