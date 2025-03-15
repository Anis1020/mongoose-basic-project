import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.modelSchema';

const createAcademicFacultyIntoDB = async (payLoad: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payLoad);
  return result;
};
const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const getSingleFacultyFromDB = async (_id: string) => {
  const result = await AcademicFaculty.findById({ _id });
  return result;
};
const updateAcademicFacultyFromDB = async (
  _id: string,
  payLoad: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id }, payLoad, {
    new: true,
  });
  return result;
};
export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleFacultyFromDB,
  updateAcademicFacultyFromDB,
};
