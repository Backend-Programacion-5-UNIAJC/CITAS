import type { Request, Response } from "express";
import * as especialidadService from "../services/especialidad.service";

export async function getAllEspecialidades(req: Request, res: Response) {
  res.status(200).json(await especialidadService.listEspecialidades());
}

export async function getEspecialidadById(req: Request, res: Response) {
  const especialidad = await especialidadService.findEspecialidadById(Number(req.params.id));

  if (!especialidad) {
    return res.status(404).json({ error: "Especialidad no encontrada" });
  }

  res.status(200).json(especialidad);
}

export async function createEspecialidad(req: Request, res: Response) {
  const { name, description } = req.body ?? {};

  if (!name || !description) {
    return res.status(400).json({
      error: "name y description son obligatorios"
    });
  }

  const especialidad = await especialidadService.createEspecialidad({
    name,
    description
  });

  res.status(201).json(especialidad);
}

export async function updateEspecialidad(req: Request, res: Response) {
  const { name, description } = req.body ?? {};

  const especialidad = await especialidadService.updateEspecialidad(Number(req.params.id), {
    name,
    description
  });

  if (!especialidad) {
    return res.status(404).json({ error: "Especialidad no encontrada" });
  }

  res.status(200).json(especialidad);
}

export async function deleteEspecialidad(req: Request, res: Response) {
  const deleted = await especialidadService.deleteEspecialidad(Number(req.params.id));

  if (!deleted) {
    return res.status(404).json({ error: "Especialidad no encontrada" });
  }

  res.status(204).send();
}