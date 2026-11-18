# CITAS — API de citas médicas

 API para administrar pacientes, especialidades y médicos para permitir la gestion  de citas médicas.

## Requisitos

- Node.js 20 o superior.
- Git.
- Postman para probar los endpoints.

## Cómo correrlo

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Backend-Programacion-5-UNIAJC/CITAS.git
   ```

2. Entrar en la carpeta del servidor:

   ```bash
   cd CITAS/academia
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Iniciar el servidor:

   ```bash
   npm run dev
   ```

5. Abrir `http://localhost:3000/health`.

   Respuesta esperada: **200 OK**.

   ```json
   {
     "status": "ok"
   }
   ```

## Endpoints

Dirección base: `http://localhost:3000`.

| Verbo | Ruta | Descripción | Éxito |
|---|---|---|---|
| GET | `/health` | Comprobar el funcionamiento de la API | 200 |
| GET | `/pacientes` | Listar pacientes | 200 |
| GET | `/pacientes/:id` | Consultar un paciente por ID | 200 |
| POST | `/pacientes` | Crear un paciente | 201 |
| PUT | `/pacientes/:id` | Actualizar un paciente | 200 |
| DELETE | `/pacientes/:id` | Eliminar un paciente | 204 |
| GET | `/especialidades` | Listar especialidades | 200 |
| GET | `/especialidades/:id` | Consultar una especialidad por ID | 200 |
| POST | `/especialidades` | Crear una especialidad | 201 |
| PUT | `/especialidades/:id` | Actualizar una especialidad | 200 |
| DELETE | `/especialidades/:id` | Eliminar una especialidad sin médicos asociados | 204 |
| GET | `/doctores` | Listar doctores | 200 |
| GET | `/doctores/:id` | Consultar un doctor por ID | 200 |
| POST | `/doctores` | Crear un doctor | 201 |
| PUT | `/doctores/:id` | Actualizar un doctor | 200 |
| DELETE | `/doctores/:id` | Eliminar un doctor | 204 |

## Equipo

- **Karen Caicedo:** colaboradora del repositorio y revisora de Pull Requests.
- **Yoseph Orozco:** colaborador del repositorio y revisor de Pull Requests.

## Permisos de cursos e instructores

Las escrituras requieren un token JWT válido.
“Solo dueño” significa que el curso pertenece al instructor autenticado.

| Endpoint | Público | ADMIN | INSTRUCTOR | STUDENT |
|---|---|---|---|---|
| GET /courses | Permitido | Permitido | Permitido | Permitido |
| GET /courses/:id | Permitido | Permitido | Permitido | Permitido |
| POST /courses | Denegado | Permitido | Permitido* | Denegado |
| PUT /courses/:id | Denegado | Permitido | Solo dueño | Denegado |
| DELETE /courses/:id | Denegado | Permitido | Solo dueño | Denegado |
| GET /instructors | Permitido | Permitido | Permitido | Permitido |
| GET /instructors/:id | Permitido | Permitido | Permitido | Permitido |
| POST /instructors | Denegado | Permitido | Denegado | Denegado |
| PUT /instructors/:id | Denegado | Permitido | Denegado | Denegado |
| DELETE /instructors/:id | Denegado | Permitido | Denegado | Denegado |

*El instructor debe tener su cuenta vinculada a un perfil de instructor.

Sin token válido, las rutas protegidas responden 401.
Sin el rol o la propiedad requerida, responden 403.
Si el usuario supera los filtros de autenticación y rol, pero el curso
que intenta editar o eliminar no existe, responden 404.

La adaptación de estos permisos al módulo de citas médicas está realizando, pendiente de subir los cambio .