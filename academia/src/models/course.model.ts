export interface Course {
  id: number;
  title: string;
  capacity: number;
}

export type CourseInput = Omit<Course, 'id'>;