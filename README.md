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