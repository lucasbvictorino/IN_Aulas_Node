import type { Movie, Prisma } from "@/@types/prisma/client.js";

interface ListMoviesQuery {
    title?: string
    page?: number
    limit?: number
}

interface ListMoviesResponse {
    data: Movie[]
    totalCount: number
    totalPages: number
    currentPage: number
}

export interface MoviesRepository {
    create(data: Prisma.MovieCreateInput): Promise<Movie>
    findBy(where: Prisma.MovieWhereInput): Promise<Movie | null>
    list(query: ListMoviesQuery): Promise<ListMoviesResponse> // list(): Promise<Movie[]>
    delete(id: number): Promise<void>
    update(id: number, data: Prisma.MovieUpdateInput): Promise<Movie>
}