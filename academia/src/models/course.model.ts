export interface Course {
  id: number;
  title: string;
  capacity: number;
  instructorId?: number | null;
}

export type CourseInput = Omit<Course, 'id'>;