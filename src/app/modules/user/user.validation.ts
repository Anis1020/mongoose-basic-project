import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(15, { message: 'password can not be more then 15 character' })
    .optional(),
});

export const userValidation = {
  userValidationSchema,
};
