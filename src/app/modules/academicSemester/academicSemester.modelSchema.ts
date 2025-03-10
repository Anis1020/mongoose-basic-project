import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './constant.academicSemester';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      // required: true,
      enum: AcademicSemesterName,
    },
    code: {
      type: String,
      // required: true,
      enum: AcademicSemesterCode,
    },
    year: {
      type: String,
      // required: true,
    },
    startMonth: {
      type: String,
      // required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      // required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExist) {
    throw new Error('this semester already exist in data base');
  }
  next();
});

export const AcademicSemester = model(
  'AcademicSemester',
  academicSemesterSchema,
);
