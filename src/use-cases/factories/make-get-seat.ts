import { PrismaSeatsRepository } from "@/repositories/prisma/seats-prisma-repository.js"
import { GetSeatUseCase } from "../seats/get-seat.js"


export function makeGetSeatUseCase() {
    const seatsRepository = new PrismaSeatsRepository()
    const useCase = new GetSeatUseCase(seatsRepository)
    
    return useCase
}
