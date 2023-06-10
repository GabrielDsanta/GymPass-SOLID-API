import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { ValidateCheckInUserService } from "../validate-check-in"


export function makeValidateCheckInService(){
    const checkInRepository = new PrismaCheckInRepository()
    const registerService = new ValidateCheckInUserService(checkInRepository)

    return registerService
}