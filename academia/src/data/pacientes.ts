
export interface Paciente {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export const pacientes: Paciente[] = [
  { id: 1, name: "Ana Torres", email: "ana@example.com", phone: "3001234567" },
  { id: 2, name: "Carlos Perez", email: "carlos@example.com", phone: "3002345678" },
  { id: 3, name: "Laura Gomez", email: "laura@example.com", phone: "3003456789" }
];