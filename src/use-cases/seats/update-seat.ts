import type { Seat, User } from "@/@types/prisma/client.js";

import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";
import type { SeatsRepository } from "@/repositories/seats-repository.js";
import type { UsersRepository } from "@/repositories/users-repository.js";

interface UpdateSeatUseCaseRequest {
    publicID: string
    data: {
        userPublicID?: string
    }
}

type UpdateSeatUseCaseResponse = {
    seat: Seat & { user: User | null }
}

export class UpdateSeatUseCase {
    constructor(
        private seatsRepository: SeatsRepository,
        private usersRepository: UsersRepository
    ) {}
    async execute({
        publicID,
        data,
    }: UpdateSeatUseCaseRequest): Promise<UpdateSeatUseCaseResponse> {
        const user = await this.usersRepository.findBy({ 
            publicID: data.userPublicID 
        })
        const seatToUpdate = await this.seatsRepository.findBy({ publicID })
        
        if(!seatToUpdate || !user) {
            throw new ResourceNotFoundError()
        }

        const seat = await this.seatsRepository.update(seatToUpdate.id, {
            userId: user.id,
            isOccupied: user ? true : false,
        })

        if (!seat) {
            throw new ResourceNotFoundError()
        }

        return { seat }
    }
}
