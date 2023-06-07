export interface registrationInterface {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  course: string;
  yearLevel: string;
  email: string;
  password: string;
}

export interface loginInterface {
  email: string;
  password: string;
}
