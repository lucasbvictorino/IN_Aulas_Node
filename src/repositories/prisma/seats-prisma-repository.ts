import type { Prisma } from "@/@types/prisma/client.js";
import type { SeatsRepository } from "../seats-repository.js";
import { prisma } from "@/libs/prisma.js";

export class PrismaSeatsRepository implements SeatsRepository {
    async findBy(where: Prisma.SeatWhereInput) {
        return await prisma.seat.findFirst({
            where,
            include: {
                user: true
            },
        })
    }

    async update(id: number, data: Prisma.SeatUncheckedUpdateInput) {
        return await prisma.seat.update({
            where: {
                id
            },
            data,
            include: {
                user: true
            },
        })
    }
}