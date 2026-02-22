
import type { Session } from "@/@types/prisma/client.js";
import type { MoviesRepository } from "@/repositories/movies-repository.js";
import type { SessionsRepository } from "@/repositories/sessions-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";

interface CreateSessionUseCaseRequest {
    startTime: Date;
    moviePublicID: string;
}

type CreateSessionUseCaseResponse = {
    session: Session
}

export class CreateSessionUseCase {
    constructor (
        private moviesRepository: MoviesRepository, 
        private sessionsRepository: SessionsRepository
    ) {}
    async execute({
        startTime,
        moviePublicID,
    }: CreateSessionUseCaseRequest): Promise<CreateSessionUseCaseResponse> {
        
        const movie = await this.moviesRepository.findBy({
            publicID: moviePublicID
        })
        if(!movie) {
            throw new ResourceNotFoundError()
        }
        
        const session = await this.sessionsRepository.create({
            startTime,
            movieId: movie.id,
        })

        return { session }
    }

}
