import {Course, courses } from "../data/courses";


let nextId = Math.max(0, ...courses.map((course) => course.id)) + 1;

export function listCourses(): Course[] {
  return courses;
}

export function findCourseById(id: number): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function createCourse(data: Omit<Course, "id">): Course {
  const newCourse: Course = {
    id: nextId++,
    title: data.title,
    capacity: data.capacity
  };

  courses.push(newCourse);
  return newCourse;
}

export function updateCourse(
  id: number,
  data: Omit<Course, "id">
): Course | undefined {
  const course = findCourseById(id);

  if (!course) {
    return undefined;
  }

  course.title = data.title;
  course.capacity = data.capacity;

  return course;
}

export function deleteCourse(id: number): boolean {
  const index = courses.findIndex((course) => course.id === id);

  if (index === -1) {
    return false;
  }

  courses.splice(index, 1);
  return true;
}