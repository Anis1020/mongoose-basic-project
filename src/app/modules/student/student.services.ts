import mongoose from 'mongoose';
import { Student } from './student.modelSchema';
import { User } from '../user/user.modelSchema';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/Querybuilder';
import { studentSearchableFields } from './constant.student';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // console.log(query);
  // const queryObj = { ...query };
  // //{email:{$regex:query.searchTerm,$options:'i'}}

  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((elem) => delete queryObj[elem]);

  //const filterQuery = searchQuery.find(queryObj).populate('admissionSemester');
  /* .populate({
  path:'academicDepartment',
  populate:{
  path:'academicFaculty'
  }
  });
  */
  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);

  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query.limit) {
  //   limit = Number(query.limit);
  //}
  // if (query.page) {
  //   page = Number(query.page);
  // }
  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // //fields limiting
  // let fields = '-__v';
  // if (query.queryField) {
  //   fields = (query.queryField as string).split(',').join(' ');
  // }
  // const fieldQuery = await limitQuery.select(fields);
  // return fieldQuery;

  const studentQuery = new QueryBuilder(
    Student.find().populate('admissionSemester'),
    /*.populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),*/
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};
const getOneStudent = async (id: string) => {
  const result = await Student.findOne({ id });
  //get user using aggregate
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const updateStudentFromDB = async (id: string, payLoad: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payLoad;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
  });
  return result;
};

const deleteAStudent = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new Error('fail to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new Error('fail to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('fail to delete student');
  }
};
export const StudentServices = {
  getAllStudentFromDB,
  getOneStudent,
  updateStudentFromDB,
  deleteAStudent,
};
