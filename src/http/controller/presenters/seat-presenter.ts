import type { Seat, User } from "@/@types/prisma/client.js"

type HTTPSeat = {
    id: string
    number: number
    row: string
    price: string
    isOccupied: boolean
    createdAt: Date
    updatedAt: Date
    user: {
        id: string
        name: string
        email: string
        username: string
        createdAt: Date
        updatedAt: Date
    } | null
}

export class SeatPresenter {
    static toHTTP(seat: Seat & { user: User | null }): HTTPSeat 
    static toHTTP(seats: (Seat & { user: User | null })[]): HTTPSeat[]
    static toHTTP(input: Seat & { user: User | null } | (Seat & { user: User| null })[]): HTTPSeat | HTTPSeat[] {
        if (Array.isArray(input)) {
            return input.map((m) => this.toHTTP(m))
        }

        return {
            id: input.publicID,
            number: input.number,
            row: input.row,
            price: input.price.toString(),
            isOccupied: input.isOccupied,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
            user: input.user ? {
                id: input.user.publicID,
                name: input.user.name,
                email: input.user.email,
                username: input.user.username,
                createdAt: input.user.createdAt,
                updatedAt: input.user.updatedAt,
            } : null
        }
    }
}