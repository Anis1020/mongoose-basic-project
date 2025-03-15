import express from 'express';
import { CourseController } from './controller.course';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './createCourseValidation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidation),
  CourseController.createCourse,
);
router.get('/', CourseController.getAllCourse);
router.get('/:id', CourseController.getSingleCourse);
router.patch(
  '/:id',
  validateRequest(CourseValidation.updateCourseValidation),
  CourseController.updateCourse,
);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidation.facultiesWithCourseValidation),
  CourseController.assignFaculties,
);
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidation.facultiesWithCourseValidation),
  CourseController.removeFaculties,
);
router.delete('/:id', CourseController.deleteCourse);

export const CourseRouter = router;
