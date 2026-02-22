import type { FastifyInstance } from "fastify";
import { update } from "./update-seat.controller.js";
import { get } from "./get-seat.controller.js";


export async function seatsRoutes(app:FastifyInstance) {
    app.get('/:publicID', get)
    app.patch('/:publicID', update)
}