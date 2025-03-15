import catchAsync from '../../utils/catchAsync';
import { academicFacultyServices } from './academicFaculty.services';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Academic faculty created successfully',
    data: result,
  });
});
const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultyFromDB();
  res.status(200).json({
    success: true,
    message: 'these are the all academic faculty',
    data: result,
  });
});
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await academicFacultyServices.getSingleFacultyFromDB(id);
  res.status(200).json({
    success: true,
    message: 'the faculty is',
    data: result,
  });
});
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await academicFacultyServices.updateAcademicFacultyFromDB(id);
  res.status(200).json({
    success: true,
    message: 'Academic Faculty update successfully',
    data: result,
  });
});
export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
