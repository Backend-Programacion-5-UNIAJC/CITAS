export interface Course {
  id: number;
  title: string;
  capacity: number;
}

export const courses: Course[] = [
  { id: 1, title: "TypeScript", capacity: 25 },
  { id: 2, title: "Desarrollo V", capacity: 20 },
  { id: 3, title: "From JS y C++", capacity: 30 }
];