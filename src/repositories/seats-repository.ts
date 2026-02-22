import type { Prisma, Seat, User } from "@/@types/prisma/client.js";

export interface SeatsRepository {
    findBy(where: Prisma.SeatWhereInput): Promise<(Seat & {user: User | null}) | null>
    update(
        id: number, 
        data: Prisma.SeatUncheckedUpdateInput
    ): Promise<(Seat & {user: User | null}) | null>
}