export interface Doctor {
  id: number;
  name: string;
  email: string;
  especialidadId: number;
}

export type DoctorInput = Omit<Doctor, "id">;
