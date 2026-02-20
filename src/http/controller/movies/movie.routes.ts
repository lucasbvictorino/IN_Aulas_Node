import type { FastifyInstance } from "fastify";
import { createMovie } from "./create-movie.controller.js";
import { listMovies } from "./list-movies.controller.js";
import { getMovie } from "./get-movie.controller.js";
import { deleteMovie } from "./delete-movie.controller.js";
import { updateMovie } from "./update-movie.controller.js";


export async function moviesRoutes(app:FastifyInstance) {
    app.post('/', createMovie)
    app.get('/', listMovies)
    app.get('/:publicID', getMovie)
    app.delete('/:publicID', deleteMovie)
    app.patch('/:publicID', updateMovie)
}