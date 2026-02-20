import type { Movie } from "@/@types/prisma/client.js";
import type { MoviesRepository } from "@/repositories/movies-repository.js";

interface CreateMovieUseCaseRequest {
    title: string;
    genre: string;
    ageRating: number;
}

type CreateMovieUseCaseResponse = {
    movie: Movie
}

export class CreateMovieUseCase {
    constructor (private moviesRepository: MoviesRepository) {

    }
    async execute({
        title,
        genre,
        ageRating
    }: CreateMovieUseCaseRequest): Promise<CreateMovieUseCaseResponse> {
        const movie = await this.moviesRepository.create({
            title,
            genre,
            ageRating,
        })
        
        return { movie }
    }
}
