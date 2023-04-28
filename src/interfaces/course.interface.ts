export interface ClassSchedule {
  day: string;
  times: string;
  room?: string;
}

export interface Seat {
  totalSeat: string;
  registered: string;
  remain: string;
}

export interface CourseDetails {
  courseNameTH: string;
  courseNameEN: string;
  faculty: string;
  department: string;
  courseStatus: string;
  courseCondition: string[] | null;
  continueCourse: string[] | null;
  equivalentCourse: string[] | null;
  midExam: string | null;
  finalExam: string | null;
}

export interface CourseData {
  id: number;
  url: string;
  courseCode: string;
  version: string;
  courseNameEN: string;
  courseNameTH: string;
  faculty: string;
  department: string;
  note: string | null;
  professors: string[];
  credit: string;
  section: string;
  status: string;
  language: string;
  degree: string;
  classSchedule: ClassSchedule[] | null;
  seat: Seat;
  details: Partial<CourseDetails>;
}
