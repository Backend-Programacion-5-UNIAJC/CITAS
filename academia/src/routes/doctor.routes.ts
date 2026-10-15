import { Router } from "express";
import {
  getAllDoctores,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor
} from "../controllers/doctor.controller";

const doctorRoutes = Router();

doctorRoutes.get("/", getAllDoctores);
doctorRoutes.get("/:id", getDoctorById);
doctorRoutes.post("/", createDoctor);
doctorRoutes.put("/:id", updateDoctor);
doctorRoutes.delete("/:id", deleteDoctor);

export default doctorRoutes;