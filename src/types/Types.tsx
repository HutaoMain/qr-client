export interface registrationInterface {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  idNumber: string;
  course: string;
  yearLevel: string;
  email: string;
  password: string;
}

export interface loginInterface {
  email: string;
  password: string;
}

export interface eventMapperInterface {
  _id: string;
  eventName: string;
  eventDateAndTime: string;
  eventLocation: string;
}

export interface userInterface {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  idNumber: string;
  course: string;
  yearLevel: string;
  email: string;
  role: string;
}

export interface parentInfoInterface {
  attendeeFirstName: string;
  attendeeMiddleName: string;
  attendeeLastName: string;
  attendeeRelationship: string;
}

export interface attendeesInterface {
  _id: string;
  eventName: string;
  eventDateAndTime: string;
  eventLocation: string;
  email: string;
  attendeeFirstName: string;
  attendeeMiddleName: string;
  attendeeLastName: string;
  attendeeIdNumber: string;
  attendeeYearLevel: string;
  attendeeCourse: string;
  attendeeRelationship: string;
  status: string;
  timeIn: string;
  timeOut: string;
}
