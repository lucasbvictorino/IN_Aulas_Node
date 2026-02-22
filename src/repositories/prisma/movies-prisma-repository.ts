import type { Prisma } from "@/@types/prisma/client.js";
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
    async list({ title, page = 1, limit = 5 }: { title?: string, page?: number, limit?: number }) {
        const skip = (page - 1) * limit
        
        const where: Prisma.MovieWhereInput = {
            title: title?{
                contains: title,
                mode: 'insensitive',
            } : undefined
        }

        const movies = await prisma.movie.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                title: 'asc'
            }
        })
        const totalCount = await prisma.movie.count({ where })
        const totalPages = Math.ceil(totalCount / limit)
        
        return {
            data: movies,
            totalCount,
            totalPages,
            currentPage: page,
        }
    }
    async delete(id: number): Promise<void> {
        await prisma.movie.delete({ where: { id } })
    }
    async update(id: number, data: MovieUpdateInput) {
        return await prisma.movie.update({ where: { id }, data })
    }
}