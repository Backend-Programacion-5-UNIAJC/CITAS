export interface Doctor {
  id: number;
  name: string;
  email: string;
  especialidadId: number;
}

export const doctores: Doctor[] = [
  { id: 1, name: "Carlos Perez", email: "carlos@example.com", especialidadId: 1 },
  { id: 2, name: "Laura Torres", email: "laura@example.com", especialidadId: 2 },
  { id: 3, name: "Andres Gomez", email: "andres@example.com", especialidadId: 3 }
];