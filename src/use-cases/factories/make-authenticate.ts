import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { AuthenticateUserUseCase } from "../users/autenticate.js";


export function makeAuthenticateUseCase() {
    const userRepository = new PrismaUsersRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)

    return authenticateUserUseCase
}