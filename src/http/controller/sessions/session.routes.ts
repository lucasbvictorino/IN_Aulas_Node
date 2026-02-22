import type { FastifyInstance } from "fastify";
import { createSession } from "./create-session.controller.js";

export async function sessionsRoutes(app:FastifyInstance) {
    app.post('/:moviePublicID', createSession)

}