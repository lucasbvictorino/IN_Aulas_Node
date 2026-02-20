import type { Movie } from "@/@types/prisma/client.js";
import type { MoviesRepository } from "@/repositories/movies-repository.js";

type ListMoviesUseCaseResponse = {
    movies: Movie[]
}

export class ListMoviesUseCase {
    constructor (private moviesRepository: MoviesRepository) {

    }
    async execute(): Promise<ListMoviesUseCaseResponse> {

        const movies = await this.moviesRepository.list()
        
        return { movies }
    }
}
