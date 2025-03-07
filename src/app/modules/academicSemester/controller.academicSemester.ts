import { string } from 'zod';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './services.academicSemester';

const createSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.createSemesterIntoDB(req.body);
  res.status(500).json({
    success: true,
    message: 'semester created successfully',
    data: result,
  });
});
const getAllSemesters = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.getAllSemesterFromDB();
  res.status(500).json({
    success: true,
    message: 'Available semester are this',
    data: result,
  });
});
const getSingleSemesters = catchAsync(async (req, res, next) => {
  const id = req.params.semesterId;
  const result = await AcademicSemesterServices.getSingleSemesterFromDB(id);
  res.status(500).json({
    success: true,
    message: 'your semester is this',
    data: result,
  });
});
const updateSemester = catchAsync(async (req, res, next) => {
  const id = req.params.semesterId;
  const result = await AcademicSemesterServices.updateSemesterFromDB(
    id,
    req.body,
  );
  res.status(500).json({
    success: true,
    message: 'your semester update successfully',
    data: result,
  });
});
export const AcademicControllers = {
  createSemester,
  getAllSemesters,
  getSingleSemesters,
  updateSemester,
};
