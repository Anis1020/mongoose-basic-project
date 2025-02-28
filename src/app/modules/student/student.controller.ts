import { Request, response, Response } from 'express';
import { StudentServices } from './student.services';

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body.student;
    //will coll service fnc
    const result = await StudentServices.createStudentIntoDB(studentData);
    //send response
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'all student are this',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve students',
      error: error.message,
    });
  }
};
//get one user
const getOneStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.getOneStudent(studentId);
    res.status(200).json({
      success: true,
      message: 'single student is here',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteAStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteAStudent(studentId);
    res.status(200).json({
      success: true,
      message: 'student deleted successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getOneStudent,
  deleteAStudent,
};
