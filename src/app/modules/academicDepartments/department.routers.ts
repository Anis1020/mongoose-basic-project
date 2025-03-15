import express from 'express';
import { DepartmentControllers } from './department.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { DepartmentValidation } from './department.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(DepartmentValidation.departmentValidation),
  DepartmentControllers.createADepartment,
);
router.get('/', DepartmentControllers.getAllDepartment);
router.get('/:id', DepartmentControllers.getSingleDepartment);
router.patch(
  '/:id',
  validateRequest(DepartmentValidation.updateDepartmentValidation),
  DepartmentControllers.updateDepartment,
);

export const DepartmentRouter = router;
