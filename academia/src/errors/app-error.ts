// todo lo que no sea un AppError se trata como un error inesperado(500)

export class AppError extends Error {
    constructor{
        public statusCode: number,
        message: string, 
        public code: string,
        public details?: unknown, 
    }{
        super(message); 
        this.name = 'AppError'
    }
}