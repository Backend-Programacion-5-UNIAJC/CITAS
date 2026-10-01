import express from "express";
import courseRoutes from "./routes/course.routes";
import instructorRoutes from "./routes/instructor.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/courses", courseRoutes);

app.use("/instructors", instructorRoutes);

app.get("/version", (_req, res) => {
  res.status(200).json({ version: "1.0.0" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


