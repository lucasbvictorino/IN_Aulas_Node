import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify" 
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeDeleteMovieUseCase } from "@/use-cases/factories/make-delete-movie.js"

export async function deleteMovie(request: FastifyRequest, reply: FastifyReply) {
    try {
        const deleteMovieParamsSchema = z.object({
            publicID: z.string()
        })

        const { publicID } = deleteMovieParamsSchema.parse(request.params)

        const deleteMovieUseCase = makeDeleteMovieUseCase()

        await deleteMovieUseCase.execute({
            publicID,
        })
        
        return reply.status(200).send()
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}
