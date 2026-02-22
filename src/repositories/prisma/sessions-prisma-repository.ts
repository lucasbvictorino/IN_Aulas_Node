import type { Prisma } from "@/@types/prisma/client.js";
import { prisma } from "@/libs/prisma.js";
import type { SessionsRepository } from "../sessions-repository.js";

export class PrismaSessionsRepository implements SessionsRepository {
    async create(data: Prisma.SessionUncheckedCreateInput) {
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const seatsPerRow = 5;
        const price = 20.00;

        return await prisma.session.create({
            data: {
                ...data,
                seats: {
                    create: Array.from({ length: rows.length * seatsPerRow }).map((_, index) => ({
                        row: rows[Math.floor(index / seatsPerRow)]!,
                        number: (index % seatsPerRow) + 1,
                        price,
                    })),
                },
            },
        });
    }
}