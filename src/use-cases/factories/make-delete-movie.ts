import { PrismaMoviesRepository } from "@/repositories/prisma/movies-prisma-repository.js";
import { DeleteMovieUseCase } from "../movies/delete-movie.js";

export function makeDeleteMovieUseCase() {
    const moviesRepository = new PrismaMoviesRepository()
    const useCase = new DeleteMovieUseCase(moviesRepository)
    
    return useCase
}
