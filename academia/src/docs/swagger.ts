import swaggerJsdoc from 'swagger-jsdoc';

export const swagger = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: { title: 'AcademiaAPI', version: '1.0.0', description: 'API de gestion de cursos e instructores '},
        // URL relativa funciona iguial en Localhost y cuando la API este despligada. 
        servers: [{url: '/', description: 'Este servidor'}],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Course: {
                    type: 'object',
                    required: ['id', 'title', 'capacity'],
                    properties: {
                        id: { type: 'integer', example: 1 },
                        title: { type: 'string', example: 'Backend V' },
                        capacity: { type: 'integer', example: 30 },
                        instructorId: { type: 'integer', nullable: true, example: 1 },
                    },
                },
                CourseInput: {
                    type: 'object',
                    required: ['title', 'capacity'],
                    properties: {
                        title: { type: 'string', example: 'Backend V' },
                        capacity: { type: 'integer', example: 30 },
                        instructorId: { type: 'integer', nullable: true, example: 1 },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'],
});
