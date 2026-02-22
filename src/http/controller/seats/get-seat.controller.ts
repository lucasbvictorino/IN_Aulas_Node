import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeGetSeatUseCase } from "@/use-cases/factories/make-get-seat.js"
import { SeatPresenter } from "../presenters/seat-presenter.js"


export async function get(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getParamsSchema = z.object({
            publicID: z.string()
        })

        const { publicID } = getParamsSchema.parse(request.params)
        const getSeatUseCase = makeGetSeatUseCase()
        const { seat } = await getSeatUseCase.execute({
            publicID,
        })
        
        return reply.status(200).send(SeatPresenter.toHTTP(seat))
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}