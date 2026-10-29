export interface Paciente {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export type PacienteInput = Omit<Paciente, "id">;
