import type { Seat, User } from "@/@types/prisma/client.js";

import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";
import type { SeatsRepository } from "@/repositories/seats-repository.js";

interface GetSeatUseCaseRequest {
    publicID: string
}

type GetSeatUseCaseResponse = {
    seat: Seat & { user: User | null }
}

export class GetSeatUseCase {
    constructor(private seatsRepository: SeatsRepository) {}
    async execute({
        publicID,
    }: GetSeatUseCaseRequest): Promise<GetSeatUseCaseResponse> {
        const seat = await this.seatsRepository.findBy({ publicID })
        
        if(!seat) {
            throw new ResourceNotFoundError()
        }

        return { seat }
    }
}
