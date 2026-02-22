import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeCreateSessionUseCase } from "@/use-cases/factories/make-create-session.js"
import { SessionPresenter } from "../presenters/session-presenter.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"



export async function createSession(
    request: FastifyRequest, reply: FastifyReply) {
    try {
        const createSessionParamSchema = z.object({
            moviePublicID: z.string().uuid(),
        })

        const { moviePublicID } = createSessionParamSchema.parse(request.params)

        const createSessionBodySchema = z.object({
            startTime: z.coerce.date(),
        })

        const { startTime } = createSessionBodySchema.parse(request.body)

        const createSessionUseCase = makeCreateSessionUseCase()

        const { session } = await createSessionUseCase.execute({
            moviePublicID,
            startTime,
        })
        
        return reply.status(201).send({ session: SessionPresenter.toHTTP(session)})
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}
