import { PrismaUsersReposity } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUserService } from "../register"


export function makeRegisterUserService(){
    const prismaRepository = new PrismaUsersReposity()
    const registerService = new RegisterUserService(prismaRepository)

    return registerService
}