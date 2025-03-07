export type TUser = {
  id: string;
  password: string;
  needPasswordReset: boolean;
  role: 'student' | 'faculty' | 'admin';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
