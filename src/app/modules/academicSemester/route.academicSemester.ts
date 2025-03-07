import express from 'express';
import { AcademicControllers } from './controller.academicSemester';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './validation.academicSemester';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterValidation),
  AcademicControllers.createSemester,
);
router.get('/', AcademicControllers.getAllSemesters);
router.get('/:semesterId', AcademicControllers.getSingleSemesters);
router.patch(
  '/:semesterId',
  validateRequest(academicSemesterValidation.updateAcademicSemesterValidation),
  AcademicControllers.updateSemester,
);

export const AcademicSemesterRoute = router;
