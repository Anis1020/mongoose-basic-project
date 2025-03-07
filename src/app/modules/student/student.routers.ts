import express from 'express';
import { StudentController } from './student.controller';
const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getOneStudent);
router.delete('/:studentId', StudentController.deleteAStudent);

export const StudentRouter = router;
