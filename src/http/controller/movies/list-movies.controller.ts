import type { FastifyReply, FastifyRequest } from "fastify"
import { MoviePresenter } from "../presenters/movie-presenter.js"
import { makeListMoviesUseCase } from "@/use-cases/factories/make-list-movies.js"
import z from "zod"

export async function listMovies(
    _request: FastifyRequest, 
    reply: FastifyReply
) {
    
    const listMoviesQuerySchema = z.object({
        title: z.string().optional(),
        page: z.coerce.number().optional(),
        limit: z.coerce.number().optional(),
    })

    const { title, page, limit } = listMoviesQuerySchema.parse(_request.query)
    const listMoviesUseCase = makeListMoviesUseCase()

    const { movies, totalCount, totalPages, currentPage } = await listMoviesUseCase.execute({ title, page, limit })
    
    return reply
    .status(200)
    .send({
        movies: MoviePresenter.toHTTP(movies),
        totalCount,
        totalPages,
        currentPage,
    })


}