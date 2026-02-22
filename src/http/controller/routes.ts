import type { FastifyInstance } from "fastify";
import { usersRoutes } from "./users/user.routes.js";
import { moviesRoutes } from "./movies/movie.routes.js";

export async function appRoutes(app: FastifyInstance) {
    app.register(usersRoutes, {prefix: '/users'})
    app.register(moviesRoutes, {prefix: '/movies'})
    app.register(moviesRoutes, {prefix: '/sessions'})
}