import "dotenv/config";
import express from "express";
import courseRoutes from "./routes/course.routes";
import instructorRoutes from "./routes/instructor.routes";
import pacienteRoutes from "./routes/paciente.routes";
import doctorRoutes from "./routes/doctor.routes";
import especialidadRoutes from "./routes/especialidad.routes";
import authRoutes from "./routes/auth.routes";
import { errorMiddleware, NotFoundMiddleware } from "./middleware/error.middleware";
import { swagger } from "./docs/swagger";
import swaggerUi from 'swagger-ui-express';



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/instructors", instructorRoutes);
//Documentacion interactiva en /api-docs y el contrato en JSON para Postam o el frontend.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));
app.get("/api-docs.json", (_req, res) => {
  res.json(swagger);
});

app.use("/pacientes", pacienteRoutes);
app.use("/doctores", doctorRoutes);
app.use("/especialidades", especialidadRoutes);



app.get("/version", (_req, res) => {
  res.status(200).json({ version: "1.0.0" });
});

app.use(NotFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
