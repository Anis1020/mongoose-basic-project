import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import { FacultyValidation } from './academicFaculty.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.academicFacultyValidation),
  academicFacultyController.createAcademicFaculty,
);
router.get('/', academicFacultyController.getAllAcademicFaculty);
router.get('/:id', academicFacultyController.getSingleAcademicFaculty);
router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateAcademicFacultyValidation),
  academicFacultyController.updateAcademicFaculty,
);

export const AcademicFacultyRouters = router;
