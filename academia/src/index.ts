import express from "express";
import courseRoutes from "./routes/course.routes";
import instructorRoutes from "./routes/instructor.routes";
import pacienteRoutes from "./routes/paciente.routes";
import doctorRoutes from "./routes/doctor.routes";
import especialidadRoutes from "./routes/especialidad.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/courses", courseRoutes);
app.use("/instructors", instructorRoutes);
app.use("/pacientes", pacienteRoutes);
app.use("/doctores", doctorRoutes);
app.use("/especialidades", especialidadRoutes);

app.get("/version", (_req, res) => {
  res.status(200).json({ version: "1.0.0" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});