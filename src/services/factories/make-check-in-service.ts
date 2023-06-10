import { GymRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckInService } from "../check-in"
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository"


export function makeCheckInService(){
    const checkInRepository = new PrismaCheckInRepository()
    const gymRepository = new GymRepository()
    const registerService = new CheckInService(checkInRepository, gymRepository)

    return registerService
}