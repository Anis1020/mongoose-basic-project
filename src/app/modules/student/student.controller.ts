import { StudentServices } from './student.services';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'all student are this',
    data: result,
  });
});
//get one user
const getOneStudent = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId;
  const result = await StudentServices.getOneStudent(studentId);
  res.status(200).json({
    success: true,
    message: 'single student is here',
    data: result,
  });
});
const updateOneStudent = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId;
  const { student } = req.body;
  const result = await StudentServices.updateStudentFromDB(studentId, student);
  res.status(200).json({
    success: true,
    message: ' student update successfully here',
    data: result,
  });
});
const deleteAStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteAStudent(studentId);
  res.status(200).json({
    success: true,
    message: 'student deleted successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getOneStudent,
  updateOneStudent,
  deleteAStudent,
};
