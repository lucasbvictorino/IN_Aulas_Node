import type { Movie } from "@/@types/prisma/client.js";
import type { MoviesRepository } from "@/repositories/movies-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface GetMovieUseCaseRequest {
    publicID: string
}

type GetMovieUseCaseResponse = {
    movie: Movie
}

export class GetMovieUseCase {
    constructor(private moviesRepository: MoviesRepository) {}
    async execute({
        publicID,
    }: GetMovieUseCaseRequest): Promise<GetMovieUseCaseResponse> {
        const movie = await this.moviesRepository.findBy({ publicID })
        
        if(!movie) {
            throw new ResourceNotFoundError()
        }

        return { movie }
    }
}
