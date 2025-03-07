import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, 'First name must be at least 3 characters long')
    .max(15, 'First name cannot be more than 15 characters'),
  lastName: z.string().min(1, 'Last name is required'),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  fatherContact: z.string().min(1, "Father's contact is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  motherContact: z.string().min(1, "Mother's contact is required"),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required"),
  occupation: z.string().min(1, "Local guardian's occupation is required"),
  contactNo: z.string().min(1, "Local guardian's contact number is required"),
});

// Student Schema
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().min(1, 'Date of birth is required'),
      email: z.string().email('Invalid email format'),
      contactNo: z.string().min(1, 'Contact number is required'),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  studentValidationSchema: createStudentValidationSchema,
};
