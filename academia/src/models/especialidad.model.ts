export interface Especialidad {
  id: number;
  name: string;
  description: string;
}

export type EspecialidadInput = Omit<Especialidad, "id">;
