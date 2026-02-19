import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { RegisterUserUseCase } from "@/use-cases/users/register.js"
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js"

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().trim().min(1).max(100),
        username: z.string().trim().min(1).max(100),
        email: z.email().max(100),
        password: z.string().min(8).max(100),
    })

    const { name, username, email, password } = registerBodySchema.parse(request.body)

    const usersRepository =  new PrismaUsersRepository()

    const { user } = await new RegisterUserUseCase(usersRepository).execute({
        username,
        email,
        name,
        password
    })
    
    return reply.status(201).send(user)
}