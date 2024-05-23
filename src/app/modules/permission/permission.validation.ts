import { z } from 'zod';

const postValidaiton = z.object({
  body: z.object({
    label: z.string({ required_error: 'Label is required' }),
    code: z.number({ required_error: 'Code is required' }),
  }),
});

const patchValidaiton = z.object({
  body: z.object({
    label: z.string({ required_error: 'Label is required' }).optional(),
    code: z.number({ required_error: 'Code is required' }).optional(),
  }),
});

export const PermissionValidation = { postValidaiton, patchValidaiton };
