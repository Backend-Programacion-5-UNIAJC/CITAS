import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1. Instructores: email es unico, por eso upsert (no duplica si el seed corre dos veces)
  const data = [
    { name: 'Williams Henao', email: 'williams@universidad.edu' },
    { name: 'Laura Gomez', email: 'laura@universidad.edu' },
    { name: 'Carlos Perez', email: 'carlos@universidad.edu' },
  ];
  // En orden (no en paralelo) para que los ids sean predecibles: Williams 1, Laura 2, Carlos 3.
  const creados = [];
  for (const i of data) {
    creados.push(await prisma.instructor.upsert({ where: { email: i.email }, update: {}, create: i }));
  }
  const [williams, laura, carlos] = creados;

  // 2. Cursos: solo si la tabla esta vacia (sin ids manuales)
  if ((await prisma.course.count()) === 0) {
    await prisma.course.createMany({
      data: [
        { title: 'Backend V', capacity: 17, instructorId: williams.id },
        { title: 'Calculo', capacity: 40, instructorId: laura.id },
        { title: 'Computacion en la Nube', capacity: 25, instructorId: williams.id },
        { title: 'Ingles', capacity: 60, instructorId: carlos.id },
      ],
    });
  }

  // 3. Estudiantes y una matricula de ejemplo
  const ana = await prisma.student.upsert({
    where: { email: 'ana@estudiante.edu' },
    update: {},
    create: { name: 'Ana Torres', email: 'ana@estudiante.edu' },
  });
  await prisma.student.upsert({
    where: { email: 'luis@estudiante.edu' },
    update: {},
    create: { name: 'Luis Rojas', email: 'luis@estudiante.edu' },
  });

  const backend = await prisma.course.findFirstOrThrow({ where: { title: 'Backend V' } });
  await prisma.enrollment.upsert({
    where: { studentId_courseId: { studentId: ana.id, courseId: backend.id } },
    update: {},
    create: { studentId: ana.id, courseId: backend.id },
  });

  // 4. Clase 7: cuentas para iniciar sesion (contrasena de prueba: Clave123*).
  //    Se guarda el hash, nunca el texto. Los INSTRUCTOR quedan vinculados a su perfil de instructor.
  const cuentas = [
    { name: 'Administrador', email: 'admin@academia.edu', role: 'ADMIN' as const, instructorId: null },
    { name: 'Williams Henao', email: 'williams@academia.edu', role: 'INSTRUCTOR' as const, instructorId: williams.id },
    { name: 'Laura Gomez', email: 'laura@academia.edu', role: 'INSTRUCTOR' as const, instructorId: laura.id },
  ];
  for (const c of cuentas) {
    const user = await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      // Un hash por cuenta: aunque la contrasena sea la misma, el salt hace que cada hash sea distinto.
      create: { name: c.name, email: c.email, password: await bcrypt.hash('Clave123*', 10), role: c.role },
    });
    if (c.instructorId) {
      await prisma.instructor.update({ where: { id: c.instructorId }, data: { userId: user.id } });
    }
  }

  console.log('Seed completado.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
 