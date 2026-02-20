import { PrismaMoviesRepository } from "@/repositories/prisma/movies-prisma-repository.js";
import { CreateMovieUseCase } from "../movies/create-movie.js";

export function makeCreateMovieUseCase() {
    const moviesRepository = new PrismaMoviesRepository()
    const useCase = new CreateMovieUseCase(moviesRepository)
    
    return useCase
}
