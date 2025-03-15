import { query } from 'express';
import QueryBuilder from '../../builder/Querybuilder';
import { TCourse, TCourseFaculty } from './interface.course';
import { Course, CourseFaculty } from './modelSchema.course';
import { courseSearchableFields } from './const.course';
import mongoose from 'mongoose';

const createCourseIntoDB = async (payLoad: TCourse) => {
  const result = await Course.create(payLoad);
  return result;
};
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseBuilder = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseBuilder.modelQuery;
  return result;
};
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
const updateCourseFromDB = async (id: string, payLoad: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payLoad;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //step 1
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      { new: true, runValidators: true, session },
    );

    if (!updateBasicCourseInfo) {
      throw new Error('Failed to update course basic info');
    }
    //check if there is any preRequisite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out the deleted files
      const deletedPreRequisite = preRequisiteCourses
        .filter((elem) => elem.course && elem.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisite } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!deletedPreRequisiteCourses) {
        throw new Error('Failed to delete course basic info');
      }

      // filter out the deleted files
      const newPreRequisite = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );
      const newPreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisite } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!newPreRequisiteCourse) {
        throw new Error('Failed to update new preRequisite course basic info');
      }
    }
    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to  update');
  }

  // const result = await Course.findById(id).populate(
  //   'preRequisiteCourses.course',
  // );
  // return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
const assignFacultiesInCourse = async (
  id: string,
  payLoad: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payLoad } },
    },
    { upsert: true, new: true },
  );
  return result;
};
const removeFacultiesInCourse = async (
  id: string,
  payLoad: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payLoad } },
    },
    { new: true },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseFromDB,
  deleteCourseFromDB,
  assignFacultiesInCourse,
  removeFacultiesInCourse,
};
