import { TAcademicDepartment } from './department.interface';
import { AcademicDepartment } from './department.modelSchema';

const createDepartmentIntoDB = async (payLoad: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payLoad);
  return result;
};
const getAllDepartment = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};
const getSingleDepartment = async (_id: string) => {
  const result = await AcademicDepartment.findById({ _id });
  return result;
};
const updateADepartment = async (
  _id: string,
  payLoad: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate({ _id }, payLoad, {
    new: true,
  });
  return result;
};

export const DepartmentServices = {
  createDepartmentIntoDB,
  getAllDepartment,
  getSingleDepartment,
  updateADepartment,
};
