import fastify from 'fastify'
import { appRoutes } from './http/controller/routes.js'
import { ZodError } from 'zod'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation error',
            issues: error.format,
        })
    }

    if (error instanceof SyntaxError) {
        return reply.status(400).send({
            message: 'O corpo da requisição não está em formato JSON válido. Verifique a estrutura dos dados enviados'
        })
    }
    return reply.status(500).send({message: 'Internal server error'})
})