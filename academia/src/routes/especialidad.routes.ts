import { Router } from "express";
import {
  getAllEspecialidades,
  getEspecialidadById,
  createEspecialidad,
  updateEspecialidad,
  deleteEspecialidad
} from "../controllers/especialidad.controller";

const especialidadRoutes = Router();

especialidadRoutes.get("/", getAllEspecialidades);
especialidadRoutes.get("/:id", getEspecialidadById);
especialidadRoutes.post("/", createEspecialidad);
especialidadRoutes.put("/:id", updateEspecialidad);
especialidadRoutes.delete("/:id", deleteEspecialidad);

export default especialidadRoutes;