import { z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './constant.academicSemester';

const createAcademicSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
  }),
  year: z.string().optional(),
  code: z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
  startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
});

const updateAcademicSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
  }),
  year: z.string().optional(),
  code: z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
  startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
});

export const academicSemesterValidation = {
  createAcademicSemesterValidation,
  updateAcademicSemesterValidation,
};
