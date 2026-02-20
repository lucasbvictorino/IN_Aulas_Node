import { PrismaMoviesRepository } from "@/repositories/prisma/movies-prisma-repository.js";
import { GetMovieUseCase } from "../movies/get-movie.js";

export function makeGetMovieUseCase() {
    const moviesRepository = new PrismaMoviesRepository()
    const useCase = new GetMovieUseCase(moviesRepository)
    
    return useCase
}
