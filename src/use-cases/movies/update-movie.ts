import type { Movie } from "@/@types/prisma/client.js";
import type { MoviesRepository } from "@/repositories/movies-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface UpdateMovieUseCaseRequest {
    publicID: string
    title?: string
    genre?: string
    ageRating?: number
}

type UpdateMovieUseCaseResponse = {
    movie: Movie
}

export class UpdateMovieUseCase {
    constructor(private moviesRepository: MoviesRepository) {}
    async execute({
        publicID,
        title,
        genre,
        ageRating,
    }: UpdateMovieUseCaseRequest): Promise<UpdateMovieUseCaseResponse> {
        const movieToUpdate = await this.moviesRepository.findBy({ publicID })
        
        if(!movieToUpdate) {
            throw new ResourceNotFoundError()
        }

        const movie = await this.moviesRepository.update(movieToUpdate.id, {
            title,
            genre,
            ageRating,
        })

        return { movie }
    }
}
