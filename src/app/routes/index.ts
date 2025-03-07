import { Router } from 'express';
import { StudentRouter } from '../modules/student/student.routers';
import { UserRoutes } from '../modules/user/user.router';
import { AcademicSemesterRoute } from '../modules/academicSemester/route.academicSemester';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRouter,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
