import { PrismaMoviesRepository } from "@/repositories/prisma/movies-prisma-repository.js";
import { ListMoviesUseCase } from "../movies/list-movies.js";

export function makeListMoviesUseCase() {
    const moviesRepository = new PrismaMoviesRepository()
    const useCase = new ListMoviesUseCase(moviesRepository)
    
    return useCase
}
