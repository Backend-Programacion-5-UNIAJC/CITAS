import { Doctor, doctores } from "../data/doctores";

let nextId = Math.max(0, ...doctores.map((doctor) => doctor.id)) + 1;

export function listDoctores(): Doctor[] {
  return doctores;
}

export function findDoctorById(id: number): Doctor | undefined {
  return doctores.find((doctor) => doctor.id === id);
}

export function createDoctor(data: Omit<Doctor, "id">): Doctor {
  const newDoctor: Doctor = {
    id: nextId++,
    name: data.name,
    email: data.email,
    especialidadId: data.especialidadId
  };

  doctores.push(newDoctor);
  return newDoctor;
}

export function updateDoctor(id: number, data: Partial<Omit<Doctor, "id">>): Doctor | undefined {
  const doctor = findDoctorById(id);

  if (!doctor) {
    return undefined;
  }

  if (data.name !== undefined) {
    doctor.name = data.name;
  }

  if (data.email !== undefined) {
    doctor.email = data.email;
  }

  if (data.especialidadId !== undefined) {
    doctor.especialidadId = data.especialidadId;
  }

  return doctor;
}

export function deleteDoctor(id: number): boolean {
  const index = doctores.findIndex((doctor) => doctor.id === id);

  if (index === -1) {
    return false;
  }

  doctores.splice(index, 1);
  return true;
}