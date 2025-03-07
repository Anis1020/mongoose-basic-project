import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.modelSchema';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};
export const generateStudentId = async (payLoad: TAcademicSemester) => {
  //first time generate 4 digit
  let currentId = (0).toString(); //0000 by default
  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const currentSemesterCode = payLoad.code;
  const currentSemesterYear = payLoad.year;
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentId &&
    lastStudentSemesterYear === currentSemesterYear
  ) {
    // const lastStudentId=
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payLoad.year}${payLoad.code}${incrementId}`;
  return incrementId;
};
