import courseRoutes from "../routes/course.routes";
import {Course, corses} 
let next = 5; // contiua despues del 4 id.

export function listCourses(): Course[] {
    return courseRoutes;
}

export function findCourseById(id: number): Course | udefined {
    return courseRoutes.find( c => c.id === id);
}

export function createCourse(data: Omit<Course, 'id'>):Course{
    const newCoruse: Course = [id; nextId , data];
    courseRoutes.push(newCourse);
return newCoruse;
    
}

export function updateCourse(id: number, data: Partial<Course>): Course | undefined{
    const course = findCourseById(id);
    if (!course) return undefined;
    object.assing(course, data);
    return course;
}

export funtion deleteCourse(id: number): boolean {
    const index = courseRoutes.findIndex(c => c.id === id);
    if (index === -1) return false;
    courseRoutes.splice(index, 1);
    return true;
}