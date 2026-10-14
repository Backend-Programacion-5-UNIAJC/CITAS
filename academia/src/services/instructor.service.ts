import { instructors } from "../data/instructors";
import type { Instructor } from "../data/instructors";

let nextId =
  Math.max(0, ...instructors.map((instructor) => instructor.id)) + 1;

export function listInstructors(): Instructor[] {
  return instructors;
}

export function findInstructorById(id: number): Instructor | undefined {
  return instructors.find((instructor) => instructor.id === id);
}

export function createInstructor(
  data: Omit<Instructor, "id">
): Instructor {
  const newInstructor: Instructor = {
    id: nextId++,
    name: data.name,
    email: data.email
  };

  instructors.push(newInstructor);
  return newInstructor;
}

export function updateInstructor(
  id: number,
  data: Omit<Instructor, "id">
): Instructor | undefined {
  const instructor = findInstructorById(id);

  if (!instructor) {
    return undefined;
  }

  instructor.name = data.name;
  instructor.email = data.email;

  return instructor;
}

export function deleteInstructor(id: number): boolean {
  const index = instructors.findIndex(
    (instructor) => instructor.id === id
  );

  if (index === -1) {
    return false;
  }

  instructors.splice(index, 1);
  return true;
}