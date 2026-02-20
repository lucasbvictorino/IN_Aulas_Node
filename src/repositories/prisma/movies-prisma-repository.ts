import type { Movie } from "@/@types/prisma/client.js";
import type { MoviesRepository } from "../movies-repository.js";
import type { MovieCreateInput, MovieUpdateInput, MovieWhereInput } from "@/@types/prisma/models.js";
import { prisma } from "@/libs/prisma.js";

export class PrismaMoviesRepository implements MoviesRepository {
    async create(data: MovieCreateInput){
        return await prisma.movie.create({ data })
    }
    async findBy(where: MovieWhereInput) {
        return await prisma.movie.findFirst({ where })
    }
    async list(): Promise<Movie[]> {
        return await prisma.movie.findMany()
    }
    async delete(id: number): Promise<void> {
        await prisma.movie.delete({ where: { id } })
    }
    async update(id: number, data: MovieUpdateInput) {
        return await prisma.movie.update({ where: { id }, data })
    }
}