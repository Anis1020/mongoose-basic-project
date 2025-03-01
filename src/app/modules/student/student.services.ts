import { Student } from '../student.modelSchema';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExist(studentData.id)) {
    throw new Error('user already exist');
  }

  const result = await Student.create(studentData); // build in static method

  // const student = new Student(studentData); //create an instance
  // if (await student.isUserExist(studentData.id)) {
  //   throw new Error('user already exist');
  // }
  // const result = await student.save(); // build in instance method

  return result;
};
const getAllStudentFromDB = async () => {
  const result = await Student.find();
  console.log(result);
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
  createStudentIntoDB,
  getAllStudentFromDB,
  getOneStudent,
  deleteAStudent,
};
