import { PacienteInput } from "../models/paciente.model";
import * as pacienteRepository from "../repositories/paciente.repository";

export function listPacientes() {
  return pacienteRepository.findAll();
}

export function findPacienteById(id: number) {
  return pacienteRepository.findById(id);
}

export function createPaciente(data: PacienteInput) {
  return pacienteRepository.create(data);
}

export function updatePaciente(id: number, data: Partial<PacienteInput>) {
  return pacienteRepository.update(id, data);
}

export function deletePaciente(id: number) {
  return pacienteRepository.remove(id);
}
