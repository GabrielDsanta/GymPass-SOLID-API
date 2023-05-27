import { PrismaUsersReposity } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateService } from "../authenticate"


export function makeAuthenticateService(){
    const prismaRepository = new PrismaUsersReposity()
    const authenticateService = new AuthenticateService(prismaRepository)

    return authenticateService
}