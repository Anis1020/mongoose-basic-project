import { StudentModel } from '../student.modelSchema';
import { Student } from './student.interface';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};
const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  console.log(result);
  return result;
};
const getOneStudent = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};
const deleteAStudent = async (id: string) => {
  const result = await StudentModel.deleteOne({ id });
  return result;
};
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getOneStudent,
  deleteAStudent,
};
