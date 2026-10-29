import type { Request, Response } from "express";
import * as pacienteService from "../services/paciente.service";

export async function getAllPacientes(req: Request, res: Response) {
  res.status(200).json(await pacienteService.listPacientes());
}

export async function getPacienteById(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "El id debe ser un entero positivo" });
  }

  const paciente = await pacienteService.findPacienteById(id);

  if (!paciente) {
    return res.status(404).json({ error: "Paciente no encontrado" });
  }

  res.status(200).json(paciente);
}

export async function createPaciente(req: Request, res: Response) {
  const { name, email, phone } = req.body ?? {};

  if (!name || !email || !phone) {
    return res.status(400).json({
      error: "name, email y phone son obligatorios"
    });
  }

  const paciente = await pacienteService.createPaciente({ name, email, phone });

  res.status(201).json(paciente);
}

export async function updatePaciente(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "El id debe ser un entero positivo" });
  }

  const { name, email, phone } = req.body ?? {};

  if (name === undefined && email === undefined && phone === undefined) {
    return res.status(400).json({ error: "Debe enviar name, email o phone para actualizar" });
  }

  if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
    return res.status(400).json({ error: "name debe ser un texto no vacío" });
  }

  if (email !== undefined && (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))) {
    return res.status(400).json({ error: "email debe tener un formato válido" });
  }

  if (phone !== undefined && (typeof phone !== "string" || phone.trim() === "")) {
    return res.status(400).json({ error: "phone debe ser un texto no vacío" });
  }

  const paciente = await pacienteService.updatePaciente(id, {
    name: name === undefined ? undefined : name.trim(),
    email: email === undefined ? undefined : email.trim(),
    phone: phone === undefined ? undefined : phone.trim()
  });

  if (!paciente) {
    return res.status(404).json({ error: "Paciente no encontrado" });
  }

  res.status(200).json(paciente);
}

export async function deletePaciente(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "El id debe ser un entero positivo" });
  }

  const deleted = await pacienteService.deletePaciente(id);

  if (!deleted) {
    return res.status(404).json({ error: "Paciente no encontrado" });
  }

  res.status(204).send();
}