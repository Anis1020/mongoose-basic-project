import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './service.course';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});
const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'all course are here',
    data: result,
  });
});
const getSingleCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CourseServices.getSingleCourseFromDB(id);
  res.status(200).json({
    success: true,
    message: 'single course is here',
    data: result,
  });
});
const updateCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CourseServices.updateCourseFromDB(id, req.body);
  res.status(200).json({
    success: true,
    message: 'course is update successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CourseServices.deleteCourseFromDB(id);
  res.status(200).json({
    success: true,
    message: 'course deleted successfully',
    data: result,
  });
});
const assignFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.assignFacultiesInCourse(
    courseId,
    faculties,
  );
  res.status(200).json({
    success: true,
    message: 'Faculties added successfully',
    data: result,
  });
});
const removeFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.removeFacultiesInCourse(
    courseId,
    faculties,
  );
  res.status(200).json({
    success: true,
    message: 'Faculties remove successfully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFaculties,
  removeFaculties,
};
