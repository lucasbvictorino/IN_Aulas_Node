import type { FastifyInstance } from "fastify";
import { register } from "./register.controller.js";
import { get, getProfile } from "./get-user.controller.js";
import { list } from "./list-users.controller.js";
import { deleteUser, deleteUserProfile } from "./delete-user.controller.js";
import { update, updateProfile } from "./update-user.controller.js";
import { authenticate } from "./authenticate.controller.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { verifyUserRole } from "@/http/middlewares/verify-user-role.js";

export async function usersRoutes(app:FastifyInstance) {
    app.post('/', register)
    app.post('/authenticate', authenticate)
    app.get('/', { onRequest: [verifyJWT, verifyUserRole(['ADMIN'])] }, list)
    app.get('/:publicID', get)
    app.delete('/:publicID', deleteUser)
    app.patch('/:publicID', update)

    // User profile Routes
    app.get('/me', { onRequest: [verifyJWT] }, getProfile)
    app.patch('/me', { onRequest: [verifyJWT] }, updateProfile)
    app.delete('/me', { onRequest: [verifyJWT] }, deleteUserProfile)
}


