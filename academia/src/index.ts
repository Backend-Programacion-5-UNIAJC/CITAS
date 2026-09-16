import express from "express"; //se especifica que vamnos a usar expres 

const app = express(); // contruya el servidor 

const PORT = process.env.PORT || 3000; // aqui que apunte al puerto 300


const courses = [
  { id: 1, title: "TypeScript", capacity: 25 },
  { id: 2, title: "Desarrollo V", capacity: 20 },
  { id: 3, title: "From JS y C++", capacity: 30 }
];

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/courses", (req, res) => {
  res.status(200).json(courses);
});

app.get("/courses/:id", (req, res) => {
  const id = Number(req.params.id);
  const course = courses.find((course) => course.id === id);

  if (!course) {
    res.status(404).json({ error: "Curso no encontrado" });
    return;
  }

  res.status(200).json(course);
});

app.get("/version", (req, res) => {
  res.status(200).json({ version: "1.0.0" });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});