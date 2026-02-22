import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeUpdateSeatUseCase } from "@/use-cases/factories/make-update-seat.js"
import { SeatPresenter } from "../presenters/seat-presenter.js"


export async function update(request: FastifyRequest, reply: FastifyReply) {
    try {
        const updateParamsSchema = z.object({
            publicID: z.string()
        })

        const updateBodySchema = z.object({
            userPublicID: z.string().optional()
        })

        const { publicID } = updateParamsSchema.parse(request.params)
        const { userPublicID } = updateBodySchema.parse(request.body)
        
        const updateSeatUseCase = makeUpdateSeatUseCase()
        const { seat } = await updateSeatUseCase.execute({
            publicID,
            data : {
                userPublicID,
            },
        })
        
        return reply.status(200).send(SeatPresenter.toHTTP(seat))
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}