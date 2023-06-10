import { FetchUserCheckInsHistoryService } from "../fetch-user-check-ins-history"
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository"


export function makeGetUserCheckInHistoryService(){
    const checkInRepository = new PrismaCheckInRepository()
    const registerService = new FetchUserCheckInsHistoryService(checkInRepository)

    return registerService
}