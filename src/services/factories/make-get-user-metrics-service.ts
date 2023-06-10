import { GetUserMetricsService } from "../get-user-metrics"
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository"


export function makeGetUserMetricsService(){
    const checkInRepository = new PrismaCheckInRepository()
    const registerService = new GetUserMetricsService(checkInRepository)

    return registerService
}