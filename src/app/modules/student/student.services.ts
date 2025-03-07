import { Student } from './student.modelSchema';

const getAllStudentFromDB = async () => {
  const result = await Student.find();

  return result;
};
const getOneStudent = async (id: string) => {
  const result = await Student.findOne({ id });
  //get user using aggregate
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteAStudent = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
export const StudentServices = {
  getAllStudentFromDB,
  getOneStudent,
  deleteAStudent,
};
