import { DoctorInput } from "../models/doctor.model";
import * as doctorRepository from "../repositories/doctor.repository";

export function listDoctores() {
  return doctorRepository.findAll();
}

export function findDoctorById(id: number) {
  return doctorRepository.findById(id);
}

export function createDoctor(data: DoctorInput) {
  return doctorRepository.create(data);
}

export function updateDoctor(id: number, data: Partial<DoctorInput>) {
  return doctorRepository.update(id, data);
}

export function deleteDoctor(id: number) {
  return doctorRepository.remove(id);
}
