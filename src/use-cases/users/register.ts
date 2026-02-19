import type { User } from "@/@types/prisma/client.js";
import { env } from "@/env/index.js";
import type { UsersRepository } from "@/repositories/users-repository.js";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
    username: string;
    email: string;
    name: string;
    password: string;
}

type RegisterUserUseCaseResponse = {
    user: User
}

export class RegisterUserUseCase {
    constructor (private usersRepository: UsersRepository) {

    }
    async execute({
        username,
        email,
        name,
        password
    }: RegisterUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
        const userWithSameEmailOrUsername = await this.usersRepository.findByEmailOrUsername(email, username)

        if (userWithSameEmailOrUsername) {
            throw new Error('Username or email already taken.')
        }

        const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

        const user = await this.usersRepository.create({
            username,
            email,
            name,
            passwordHash,
        })
        
        return { user }
    }
}