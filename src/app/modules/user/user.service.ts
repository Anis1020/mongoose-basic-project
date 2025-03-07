import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.modelSchema';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.modelSchema';
import { TUser } from './user.interface';
import { User } from './user.modelSchema';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //set default password if not given
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  //find academic semester info

  const admissionSemester = await AcademicSemester.findById(
    payLoad.admissionSemester,
  );

  // set manually generated id
  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }
  userData.id = await generateStudentId(admissionSemester);
  //create a user
  const newUser = await User.create(userData); // build in static method
  // const student = new Student(studentData); //create an instance
  // if (await student.isUserExist(studentData.id)) {
  //   throw new Error('user already exist');
  // }
  // const result = await student.save(); // build in instance method

  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    payLoad.id = newUser.id;
    payLoad.user = newUser._id; // reference student with user _id

    const newStudent = await Student.create(payLoad);
    return newStudent;
  }
  return newUser;
};

export const userServices = {
  createStudentIntoDB,
};
