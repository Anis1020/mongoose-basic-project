import { z } from 'zod';

const departmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Name is required',
    }),
  }),
});
const updateDepartmentValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic department must be string',
        required_error: 'Name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic department must be string',
        required_error: 'faculty is required',
      })
      .optional(),
  }),
});
export const DepartmentValidation = {
  departmentValidation,
  updateDepartmentValidation,
};
