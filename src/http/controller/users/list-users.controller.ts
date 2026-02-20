import type { FastifyReply, FastifyRequest } from "fastify"
// import { listUserUseCase } from "@/use-cases/users/list.js"
// import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js"
import { UserPresenter } from "../presenters/user-presenter.js"
import { makeListUseCase } from "@/use-cases/factories/make-list-users.js"

export async function list(_request: FastifyRequest, reply: FastifyReply) {
    try {
        const listUserUseCase = makeListUseCase()

        const { users } = await listUserUseCase.execute()
        
        return reply.status(200).send(UserPresenter.toHTTP(users))
    } catch (error) {
        throw error
    }
}