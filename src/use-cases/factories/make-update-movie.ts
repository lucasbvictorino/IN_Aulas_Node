import { PrismaMoviesRepository } from "@/repositories/prisma/movies-prisma-repository.js";
import { UpdateMovieUseCase } from "../movies/update-movie.js";

export function makeUpdateMovieUseCase() {
    const moviesRepository = new PrismaMoviesRepository()
    const useCase = new UpdateMovieUseCase(moviesRepository)
    
    return useCase
}
