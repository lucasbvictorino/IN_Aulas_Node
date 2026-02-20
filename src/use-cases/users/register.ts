import type { User } from "@/@types/prisma/client.js";
import { env } from "@/env/index.js";
import type { UsersRepository } from "@/repositories/users-repository.js";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists.js";

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
            throw new UserAlreadyExistsError()
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