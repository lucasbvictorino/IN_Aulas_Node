import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { MoviePresenter } from "../presenters/movie-presenter.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeUpdateMovieUseCase } from "@/use-cases/factories/make-update-movie.js"

export async function updateMovie(request: FastifyRequest, reply: FastifyReply) {
    try {
        const updateMovieParamsSchema = z.object({
            publicID: z.string()
        })

        const { publicID } = updateMovieParamsSchema.parse(request.params)

        const updateMovieBodySchema = z.object({
            title: z.string().trim().min(1).max(200).optional(),
            genre: z.string().trim().min(1).max(100).optional(),
            ageRating: z.number().int().min(0).max(18).optional(),
        })
        
        const { title, genre, ageRating } = updateMovieBodySchema.parse(request.body)

        const updateMovieUseCase = makeUpdateMovieUseCase()

        const { movie } = await updateMovieUseCase.execute({
            publicID,
            title,
            genre,
            ageRating,
        })
        
        return reply.status(200).send(MoviePresenter.toHTTP(movie))
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}
