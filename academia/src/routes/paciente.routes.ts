import { Router } from "express";
import {
  getAllPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente
} from "../controllers/paciente.controller";

const pacienteRoutes = Router();

pacienteRoutes.get("/", getAllPacientes);
pacienteRoutes.get("/:id", getPacienteById);
pacienteRoutes.post("/", createPaciente);
pacienteRoutes.put("/:id", updatePaciente);
pacienteRoutes.delete("/:id", deletePaciente);

export default pacienteRoutes;