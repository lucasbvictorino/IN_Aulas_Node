import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { MoviePresenter } from "../presenters/movie-presenter.js"
import { makeCreateMovieUseCase } from "@/use-cases/factories/make-create-movie.js"

export async function createMovie(request: FastifyRequest, reply: FastifyReply) {
    try {
        const createMovieBodySchema = z.object({
            title: z.string().trim().min(1).max(200),
            genre: z.string().trim().min(1).max(100),
            ageRating: z.number().int().min(0).max(18),
        })

        const { title, genre, ageRating } = createMovieBodySchema.parse(request.body)

        const createMovieUseCase = makeCreateMovieUseCase()

        const { movie } = await createMovieUseCase.execute({
            title,
            genre,
            ageRating
        })
        
        return reply.status(201).send(MoviePresenter.toHTTP(movie))
    } catch (error) {
        throw error
    }
}
