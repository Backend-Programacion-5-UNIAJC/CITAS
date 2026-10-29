import type { Request, Response } from "express";
import * as doctorService from "../services/doctor.service";

export async function getAllDoctores(req: Request, res: Response) {
  res.status(200).json(await doctorService.listDoctores());
}

export async function getDoctorById(req: Request, res: Response) {
  const doctor = await doctorService.findDoctorById(Number(req.params.id));

  if (!doctor) {
    return res.status(404).json({ error: "Doctor no encontrado" });
  }

  res.status(200).json(doctor);
}

export async function createDoctor(req: Request, res: Response) {
  const { name, email, especialidadId } = req.body ?? {};


  const doctor = await doctorService.createDoctor({
    name,
    email,
    especialidadId
  });

  res.status(201).json(doctor);
}

export async function updateDoctor(req: Request, res: Response) {
  const { name, email, especialidadId } = req.body ?? {};

  const doctor = await doctorService.updateDoctor(Number(req.params.id), {
    name,
    email,
    especialidadId
  });

  if (!doctor) {
    return res.status(404).json({ error: "Doctor no encontrado" });
  }

  res.status(200).json(doctor);
}

export async function deleteDoctor(req: Request, res: Response) {
  const deleted = await doctorService.deleteDoctor(Number(req.params.id));

  if (!deleted) {
    return res.status(404).json({ error: "Doctor no encontrado" });
  }

  res.status(204).send();
}