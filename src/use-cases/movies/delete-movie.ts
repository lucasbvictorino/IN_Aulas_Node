import type { MoviesRepository } from "@/repositories/movies-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface DeleteMovieUseCaseRequest {
    publicID: string
}

export class DeleteMovieUseCase {
    constructor(private moviesRepository: MoviesRepository) {}
    async execute({
        publicID,
    }: DeleteMovieUseCaseRequest): Promise<void> {
        const movieToDelete = await this.moviesRepository.findBy({ publicID })
        
        if(!movieToDelete) {
            throw new ResourceNotFoundError()
        }

        await this.moviesRepository.delete(movieToDelete.id)
    }
}
