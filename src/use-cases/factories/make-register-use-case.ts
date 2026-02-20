import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { RegisterUserUseCase } from "../users/register.js";

export function makeRegisterUseCase() {
    const userRepository = new PrismaUsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(userRepository)

    return registerUserUseCase
}