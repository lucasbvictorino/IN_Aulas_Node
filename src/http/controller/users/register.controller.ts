import z from "zod"
import { prisma } from "@/libs/prisma.js"
import type { FastifyReply, FastifyRequest } from "fastify"

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().trim().min(1).max(100),
        username: z.string().trim().min(1).max(100),
        email: z.email().max(100),
        password: z.string().min(8).max(100),
    })

    const { name, username, email, password } = registerBodySchema.parse(request.body)

    const user = await prisma.user.create({
        data: {
            name,
            username,
            email,
            passwordHash: password
        }
    })
    return reply.status(201).send(user)
}