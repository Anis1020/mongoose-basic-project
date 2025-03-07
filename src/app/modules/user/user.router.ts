import express from 'express';
import { userController } from './user.controller';
import { createStudentValidationSchema } from '../student/student.zod.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  userController.createStudent,
);

export const UserRoutes = router;
