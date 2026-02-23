import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { UserPresenter } from "../presenters/user-presenter.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeUpdateUserUseCase } from "@/use-cases/factories/make-update-user.js"

export async function updateProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sub: publicID } = request.user as { sub: string }

        const updateBodySchema = z.object({
            name: z.string().trim().min(1).max(100).optional(),
            username: z.string().trim().min(1).max(100).optional(),
            email: z.email().max(100).optional(),
        })
        
        const { name, username, email } = updateBodySchema.parse(request.body)

        const updateUserUseCase = makeUpdateUserUseCase()

        const { user } = await updateUserUseCase.execute({
            publicID,
            name,
            username,
            email,
        })
        
        return reply.status(200).send(UserPresenter.toHTTP(user))
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}

export async function update(request: FastifyRequest, reply: FastifyReply) {
    try {
        const updateParamsSchema = z.object({
            publicID: z.string()
        })

        const { publicID } = updateParamsSchema.parse(request.params)

        const updateBodySchema = z.object({
            name: z.string().trim().min(1).max(100).optional(),
            username: z.string().trim().min(1).max(100).optional(),
            email: z.email().max(100).optional(),
        })
        
        const { name, username, email } = updateBodySchema.parse(request.body)

        const updateUserUseCase = makeUpdateUserUseCase()

        const { user } = await updateUserUseCase.execute({
            publicID,
            name,
            username,
            email,
        })
        
        return reply.status(200).send(UserPresenter.toHTTP(user))
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}