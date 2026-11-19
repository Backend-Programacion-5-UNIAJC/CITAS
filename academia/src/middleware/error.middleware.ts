import {Request, response, NextFunction} from "express";
import {Prisma} from "@prisma/client";
import { AppError } from "../errors/app-error";

// ruta que no existe se convertira en un error mas con el msmo formato 
export function NotFoundMiddleware(req: Request, res: Response, next: Nextfuncion) {
    next(new AppError(404, 'No existe la ruta $(req.method ${req.originalUrl}','ROUTE_NOTFOUND'))
}

// Middleware de errores: Express lo reconoce por que tiene 4 estados.
// debe colocarse al final de index.ts despues de todas las rutas.

export function errorMiddleware(err: unknown, re: Request, res: Respanse, next: NextFunction){
    //1. erroes esperados de nuestra API (400,401,403,409)
    if(err instanceof AppError ){
        return re.status(err.statusCode).json({
         error: { code: err.code, message: err:MessageChannel, ...(err.details ? { details:err.details} : {})},

        });
        
    }
}

// Json mal escrito en el body (lo lanza exprress.json)

if (err instanceof SyntaxError && 'body' in err) {
    return response.status(400).json({
        error: { code:'INVALID_JSON', message: 'El cuerpo de la peticion no es un JSON VALIDO'}
    });
}

// errores conocidos de prisma

if (err instanceof Prisma.PrismaClientInitializationError) {
    if (error.code === 'p2002') { 
        return response.sendStatus(409).json({error: { code: 'DUPLICATE', message: 'ya existe un resgitro con ese valor unico'} });
    }
    if (error.code === 'p2025') { 
        return response.sendStatus(404).json({error: { code: 'NOT_FOUND', message: 'Registro no encontrado'} });
    }
    if (error.code === 'p2003') { 
        return response.sendStatus(409).json({error: { code: 'RELATION_CONFLICT', message: 'Laoperacion viola una relacion entre registros '} });
    }
}

// 4. La base de datos no responde (al arrancar, o se cayó la conexión: P1001, P1002, P1017)
const sinBase = ['P1001', 'P1002', 'P1017'];

if (
  err instanceof Prisma.PrismaClientInitializationError ||
  (err instanceof Prisma.PrismaClientKnownRequestError && sinBase.includes(err.code))
) {
  console.error(err);
  return res.status(503).json({
    error: {
      code: 'DATABASE_UNAVAILABLE',
      message: 'Servicio no disponible, intente más tarde',
    },
  });
}

// 5. Inesperado: el detalle completo va al log del servidor, nunca al cliente en producción.
console.error(err);
const isDev = process.env.NODE_ENV !== 'production';

res.status(500).json({
  error: {
    code: 'INTERNAL_ERROR',
    message: 'Error interno del servidor',
    ...(isDev && err instanceof Error ? { stack: err.stack } : {}),
  },
}); 