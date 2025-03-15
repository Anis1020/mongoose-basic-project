import { Router } from 'express';
import { StudentRouter } from '../modules/student/student.routers';
import { UserRoutes } from '../modules/user/user.router';
import { AcademicSemesterRoute } from '../modules/academicSemester/route.academicSemester';
import { AcademicFacultyRouters } from '../modules/academicFaculty/academicFaculty.route';
import { DepartmentRouter } from '../modules/academicDepartments/department.routers';
import { CourseRouter } from '../modules/course/router.course';

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
  {
    path: '/academic-faculties',
    route: AcademicFacultyRouters,
  },
  {
    path: '/academic-departments',
    route: DepartmentRouter,
  },
  {
    path: '/courses',
    route: CourseRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
