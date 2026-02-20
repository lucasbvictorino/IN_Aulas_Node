import type { FastifyInstance } from "fastify";
import { register } from "./register.controller.js";
import { get } from "./get-user.controller.js";
import { list } from "./list-users.controller.js";
import { deleteUser } from "./delete-user.controller.js";
import { update } from "./update-user.controller.js";

export async function usersRoutes(app:FastifyInstance) {
    app.post('/', register)
    app.get('/:publicID', get)
    app.get('/:publicID', list)
    app.delete('/:publicID', deleteUser)
    app.patch('/:publicID', update)
}