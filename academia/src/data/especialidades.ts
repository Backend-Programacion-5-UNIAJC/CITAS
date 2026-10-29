export interface Especialidad {
  id: number;
  name: string;
  description: string;
}

export const especialidades: Especialidad[] = [
  { id: 1, name: "Pediatría", description: "Atención médica de niños y adolescentes" },
  { id: 2, name: "Cardiología", description: "Atención de enfermedades del corazón" },
  { id: 3, name: "Medicina general", description: "Atención médica general" }
];