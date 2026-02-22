import type { Movie } from "@/@types/prisma/client.js";
import type { MoviesRepository } from "@/repositories/movies-repository.js";

interface ListMoviesUseCaseRequest {
    title?: string
    page?: number
    limit?: number
}

type ListMoviesUseCaseResponse = {
    movies: Movie[]
    totalCount: number
    totalPages: number
    currentPage: number
}

export class ListMoviesUseCase {
    constructor (private moviesRepository: MoviesRepository) {

    }
    async execute({
        title,
        page,
        limit,
    }: ListMoviesUseCaseRequest): Promise<ListMoviesUseCaseResponse> {

        const {
            data: movies, 
            totalCount, 
            totalPages, 
            currentPage
        } = await this.moviesRepository.list({ title, page, limit })
        
        return { movies, totalCount, totalPages, currentPage}
    }
}
