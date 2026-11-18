
import * as courseRepository from '../repositories/course.repository';
import { AuthUser } from '../models/user.model';
import { CourseInput } from '../models/course.model';
import * as instructorRepository from '../repositories/instructor.repository';



export async function listCourses() {
  return courseRepository.findAll();
}

export async function findCourseById(id: number) {
  return courseRepository.findById(id);
}

export async function createCourse(data: CourseInput, user: AuthUser) {
  if (user.role === 'INSTRUCTOR') {
    const instructor = await instructorRepository.findByUserId(user.id);

    if (!instructor) {
      throw new Error('FORBIDDEN');
    }

    data.instructorId = instructor.id;
  }

  return courseRepository.create(data);
}

export async function updateCourse(
  id: number,
  data: Partial<CourseInput>
) {
  return courseRepository.update(id, data);
}

export async function deleteCourse(id: number) {
  return courseRepository.remove(id);
}

export async function updateCourseAsOwner(
  id: number,
  user: AuthUser,
  data: Partial<CourseInput>
) {
  const course = await courseRepository.findWithOwner(id);

  if (!course) {
    throw new Error('NOT_FOUND');
  }

  if (user.role !== 'ADMIN' && course.instructor?.userId !== user.id) {
    throw new Error('FORBIDDEN');
  }

  return courseRepository.update(id, data);
}

export async function deleteCourseAsOwner(id: number, user: AuthUser) {
  const course = await courseRepository.findWithOwner(id);

  if (!course) {
    throw new Error('NOT_FOUND');
  }

  if (user.role !== 'ADMIN' && course.instructor?.userId !== user.id) {
    throw new Error('FORBIDDEN');
  }

  return courseRepository.remove(id);
}