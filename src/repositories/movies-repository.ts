import type { Movie, Prisma } from "@/@types/prisma/client.js";

export interface MoviesRepository {
    create(data: Prisma.MovieCreateInput): Promise<Movie>
    findBy(where: Prisma.MovieWhereInput): Promise<Movie | null>
    list(): Promise<Movie[]>
    delete(id: number): Promise<void>
    update(id: number, data: Prisma.MovieUpdateInput): Promise<Movie>
}