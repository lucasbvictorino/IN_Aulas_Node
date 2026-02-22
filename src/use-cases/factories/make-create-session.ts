import { PrismaSessionsRepository } from "@/repositories/prisma/sessions-prisma-repository.js"
import { CreateSessionUseCase } from "../sessions/create-session.js"
import { PrismaMoviesRepository } from "@/repositories/prisma/movies-prisma-repository.js"



export function makeCreateSessionUseCase() {
    const MoviesRepository = new PrismaMoviesRepository()
    const SessionsRepository = new PrismaSessionsRepository()
    const createUseCase = new CreateSessionUseCase(
        MoviesRepository, SessionsRepository)
    
    return createUseCase
}
