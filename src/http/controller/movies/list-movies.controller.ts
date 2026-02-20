import type { FastifyReply, FastifyRequest } from "fastify"
import { MoviePresenter } from "../presenters/movie-presenter.js"
import { makeListMoviesUseCase } from "@/use-cases/factories/make-list-movies.js"

export async function listMovies(_request: FastifyRequest, reply: FastifyReply) {
    try {
        const listMoviesUseCase = makeListMoviesUseCase()

        const { movies } = await listMoviesUseCase.execute()
        
        return reply.status(200).send(MoviePresenter.toHTTP(movies))
    } catch (error) {
        throw error
    }
}
