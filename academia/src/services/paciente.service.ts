import { Paciente, pacientes } from "../data/pacientes";


let nextId = Math.max(0, ...pacientes.map((paciente) => paciente.id)) + 1;

export function listPacientes(): Paciente[] {
  return pacientes;
}

export function findPacienteById(id: number): Paciente | undefined {
  return pacientes.find((paciente) => paciente.id === id);
}

export function createPaciente(data: Omit<Paciente, "id">): Paciente {
  const newPaciente: Paciente = {
    id: nextId++,
    name: data.name,
    email: data.email,
    phone: data.phone
  };

  pacientes.push(newPaciente);
  return newPaciente;
}

export function updatePaciente(id: number, data: Partial<Omit<Paciente, "id">>): Paciente | undefined {
  const paciente = findPacienteById(id);

  if (!paciente) {
    return undefined;
  }

  if (data.name !== undefined) {
    paciente.name = data.name;
  }

  if (data.email !== undefined) {
    paciente.email = data.email;
  }

  if (data.phone !== undefined) {
    paciente.phone = data.phone;
  }

  return paciente;
}

export function deletePaciente(id: number): boolean {
  const index = pacientes.findIndex((paciente) => paciente.id === id);

  if (index === -1) {
    return false;
  }

  pacientes.splice(index, 1);
  return true;
}