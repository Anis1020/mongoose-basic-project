import catchAsync from '../../utils/catchAsync';
import { DepartmentServices } from './department.services';

const createADepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.createDepartmentIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: 'Department created successfully',
    data: result,
  });
});
const getAllDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.getAllDepartment();
  res.status(200).json({
    success: true,
    message: 'All departments are those',
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await DepartmentServices.getSingleDepartment(id);
  res.status(200).json({
    success: true,
    message: 'the department is this',
    data: result,
  });
});
const updateDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await DepartmentServices.updateADepartment(id, req.body);
  res.status(200).json({
    success: true,
    message: 'department update successfully',
    data: result,
  });
});

export const DepartmentControllers = {
  createADepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
};
