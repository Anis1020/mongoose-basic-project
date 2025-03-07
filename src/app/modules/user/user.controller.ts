import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;

  //will call service fnc
  const result = await userServices.createStudentIntoDB(password, studentData);
  //send response
  res.status(200).json({
    success: true,
    message: 'student is created successfully',
    data: result,
  });
});
export const userController = {
  createStudent,
};
