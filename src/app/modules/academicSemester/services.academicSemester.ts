import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.modelSchema';
import { academicSemesterNameCodeMapper } from './constant.academicSemester';

const createSemesterIntoDB = async (payLoad: TAcademicSemester) => {
  // is academic name and code match as i need
  if (
    payLoad.name &&
    academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code
  ) {
    throw new Error('Invalid semester code');
  }
  const result = await AcademicSemester.create(payLoad);
  return result;
};

const getAllSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getSingleSemesterFromDB = async (_id: string) => {
  const result = await AcademicSemester.findOne({ _id });
  return result;
};
const updateSemesterFromDB = async (
  _id: string,
  payLoad: Partial<TAcademicSemester>,
) => {
  if (
    payLoad.name &&
    payLoad.code &&
    academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code
  ) {
    throw new Error('invalid semester code');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id }, payLoad, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createSemesterIntoDB,
  getAllSemesterFromDB,
  getSingleSemesterFromDB,
  updateSemesterFromDB,
};
