import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
// import { authenticateUserUseCase } from "@/use-cases/users/authenticate.js"
// import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js"
import { UserPresenter } from "../presenters/user-presenter.js"
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate.js"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error.js"

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    try {
        const authenticateBodySchema = z.object({
            username: z.string().trim().min(1).max(100).optional(),
            email: z.email().max(100).optional(),
            password: z.string().min(8).max(100),
        })

        const { username, email, password } = authenticateBodySchema.parse(request.body)

        const authenticateUserUseCase = makeAuthenticateUseCase()

        const { user } = await authenticateUserUseCase.execute({
            login: username ?? email!,
            password
        })

        const token = await reply.jwtSign({ 
            sub: user.publicID,
            role: user.role
        },
    {expiresIn: '1d'})
        
        return reply.status(201).send({token, user: UserPresenter.toHTTP(user)})
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message })
        }

        throw error
    }
}