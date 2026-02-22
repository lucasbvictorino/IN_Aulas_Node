import { PrismaSeatsRepository } from "@/repositories/prisma/seats-prisma-repository.js"
import { UpdateSeatUseCase } from "../seats/update-seat.js"
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js"



export function makeUpdateSeatUseCase() {
    const seatsRepository = new PrismaSeatsRepository()
    const usersRepository = new PrismaUsersRepository()
    const useCase = new UpdateSeatUseCase(seatsRepository, usersRepository)
    
    return useCase
}
