import * as instructorRepository from '../repositories/instructor.repository';

export async function listInstructors() {
  return instructorRepository.findAll();
}

export async function findInstructorById(id: number) {
  return instructorRepository.findById(id);
}

export async function createInstructor(data: {
  name: string;
  email: string;
}) {
  return instructorRepository.create(data);
}

export async function updateInstructor(
  id: number,
  data: { name?: string; email?: string }
) {
  return instructorRepository.update(id, data);
}

export async function deleteInstructor(id: number) {
  return instructorRepository.remove(id);
}