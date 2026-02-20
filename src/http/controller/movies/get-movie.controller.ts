import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { MoviePresenter } from "../presenters/movie-presenter.js"
import { makeGetMovieUseCase } from "@/use-cases/factories/make-get-movie.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"

export async function getMovie(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getMovieParamsSchema = z.object({
            publicID: z.string()
        })

        const { publicID } = getMovieParamsSchema.parse(request.params)

        const getMovieUseCase = makeGetMovieUseCase()

        const { movie } = await getMovieUseCase.execute({
            publicID,
        })
        
        return reply.status(200).send(MoviePresenter.toHTTP(movie))
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}
