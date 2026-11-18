# Guía de estudio — Proyecto CITAS

## Cómo ejecutar el proyecto

Requisito indicado por el README: Node.js 20 o superior.

En PowerShell:

```powershell
cd "C:\Users\JOSEPH\Desktop\programacion PRY\CITAS\academia"
npm install
npm run dev
```

Dejar abierta la terminal mientras se usa el servidor. Comprobar en el navegador:

- `http://localhost:3000/health` — debe responder `{"status":"ok"}`.
- `http://localhost:3000/pacientes` — lista los pacientes.

Detener el servidor con `Ctrl + C`. Revisar Node con `node -v`.

## Explicación breve para exponer

“Este proyecto es una API desarrollada con Node.js, Express y TypeScript. Una API permite que otros programas se comuniquen con el servidor mediante solicitudes HTTP. La solicitud pasa por una ruta, llega a un controlador, el controlador usa un servicio para operar sobre los datos y finalmente devuelve una respuesta JSON con un código HTTP.”

Flujo:

```text
Solicitud HTTP → ruta → controlador → servicio → arreglo de datos
Respuesta HTTP ← controlador ← resultado del servicio
```

### Archivos principales

- `academia/src/index.ts`: crea la aplicación Express, habilita la lectura de JSON, registra las rutas y escucha en el puerto 3000 por defecto. Incluye `/health` y `/version`.
- `src/routes/`: relaciona métodos y rutas HTTP con controladores.
- `src/controllers/`: valida entradas y decide la respuesta HTTP.
- `src/services/`: contiene las operaciones de consulta, creación, actualización y eliminación.
- `src/data/`: define los tipos TypeScript y los arreglos con los datos iniciales.

### Recursos y rutas

| Recurso | Prefijo | Campos principales |
|---|---|---|
| Pacientes | `/pacientes` | `id`, `name`, `email`, `phone` |
| Doctores | `/doctores` | `id`, `name`, `email`, `especialidadId` |
| Cursos | `/courses` | `id`, `title`, `capacity` |
| Instructores | `/instructors` | `id`, `name`, `email` |

Cada recurso expone operaciones CRUD, generalmente con `GET` para consultar, `POST` para crear, `PUT` para actualizar y `DELETE` para eliminar. Para pacientes, `PUT` permite actualizar campos enviados; cursos e instructores validan campos requeridos al actualizar. Las validaciones varían entre recursos.

### Códigos HTTP comunes

- `200`: consulta o actualización exitosa.
- `201`: registro creado.
- `204`: eliminación exitosa, sin contenido en la respuesta.
- `400`: datos o parámetros inválidos.
- `404`: registro no encontrado.

### Persistencia y relaciones

Los datos están en arreglos de TypeScript en memoria. El servicio usa operaciones como `find`, `findIndex`, `push` y `splice`. No hay una base de datos configurada: al reiniciar el proceso, los cambios hechos durante la ejecución se pierden y se cargan de nuevo los datos iniciales.

El campo `especialidadId` del doctor no tiene una entidad de especialidades implementada a la cual validarse. Tampoco hay rutas ni modelo de citas; por ello, el código actual no registra citas ni vincula pacientes con doctores mediante citas.

El README describe una API de citas y menciona especialidades, pero el código actual monta `/pacientes`, `/doctores`, `/courses` y `/instructors`. Conviene explicar lo que existe realmente en el código.

## Preguntas de Git

- `git clone`: copia un repositorio remoto a la computadora, incluido su historial.
- `git add`: prepara cambios para el próximo commit.
- `git commit`: guarda una versión de los cambios en el historial local.
- `git push`: envía commits locales al repositorio remoto. No sube cambios sin commit ni despliega automáticamente la API.
- `git fetch`: descarga información del remoto sin integrar esos cambios a la rama de trabajo.
- `git pull`: descarga cambios e intenta integrarlos en la rama actual.
- Rama (`branch`): línea de trabajo separada para desarrollar cambios.
- `origin`: nombre habitual del repositorio remoto principal.
- `git status`: muestra la rama y el estado de los cambios locales.
- Conflicto: aparece cuando Git no puede combinar automáticamente cambios incompatibles; una persona debe resolver qué contenido conservar.

## Respuestas orales rápidas

**¿Qué base de datos usa?** “En esta versión no hay base de datos; se usan arreglos en memoria y los cambios no persisten al reiniciar.”

**¿El proyecto agenda citas?** “El README lo plantea como una API de citas, pero en el código actual no hay rutas ni modelo para citas.”

**¿Qué hace `git push`?** “Envía al remoto los commits que ya guardé localmente; primero preparo cambios con `git add` y los guardo con `git commit`.”

**¿Subir con `git push` publica el servidor?** “No. Sube commits al repositorio remoto; no despliega ni ejecuta la API por sí mismo.”

## Punto 10.2 — restricción única para Doctor

Respuesta para explicar: En el modelo `Doctor`, el campo `email` tiene la restricción `@unique`. Si se intenta registrar un correo repetido, Prisma genera el error `P2002` y el cliente debería recibir HTTP `409 Conflict`.

Nota de estado: esta restricción aparece en la copia local modificada de `academia/prisma/schema.prisma`, pero al consultar GitHub todavía no aparecía en las ramas remotas. Confirma que la compañera la haya subido antes de decir que ya está en el repositorio.
