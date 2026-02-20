import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { GetUserUseCase } from "../users/get-user.js";


export function makeGetUseCase() {
    const userRepository = new PrismaUsersRepository()
    const getUserUseCase = new GetUserUseCase(userRepository)

    return getUserUseCase
}