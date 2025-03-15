import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.zod.validation';
const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getOneStudent);
router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  StudentController.updateOneStudent,
);
router.delete('/:studentId', StudentController.deleteAStudent);

export const StudentRouter = router;
