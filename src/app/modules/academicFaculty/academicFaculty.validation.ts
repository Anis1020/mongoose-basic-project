import { z } from 'zod';

const academicFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be string',
    }),
  }),
});
const updateAcademicFacultyValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be string',
    }),
  }),
});
export const FacultyValidation = {
  academicFacultyValidation,
  updateAcademicFacultyValidation,
};
