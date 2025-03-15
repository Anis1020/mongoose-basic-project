import mongoose from 'mongoose';
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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set manually generated id
    if (!admissionSemester) {
      throw new Error('Admission semester not found');
    }
    userData.id = await generateStudentId(admissionSemester);
    //create a user (transaction 1)
    const newUser = await User.create([userData], { session }); // build in static method
    //create a student
    if (!newUser.length) {
      throw new Error('fail to create user');
    }
    //set id, _id as user
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id; // reference student with user _id

    //create a student transaction 2
    const newStudent = await Student.create([payLoad], { session });
    if (!newStudent) {
      throw new Error('fail to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;

    // return newUser;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const userServices = {
  createStudentIntoDB,
};
