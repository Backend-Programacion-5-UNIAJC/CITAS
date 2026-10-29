import { EspecialidadInput } from "../models/especialidad.model";
import * as especialidadRepository from "../repositories/especialidad.repository";

export function listEspecialidades() {
  return especialidadRepository.findAll();
}

export function findEspecialidadById(id: number) {
  return especialidadRepository.findById(id);
}

export function createEspecialidad(data: EspecialidadInput) {
  return especialidadRepository.create(data);
}

export function updateEspecialidad(id: number, data: Partial<EspecialidadInput>) {
  return especialidadRepository.update(id, data);
}

export function deleteEspecialidad(id: number) {
  return especialidadRepository.remove(id);
}
