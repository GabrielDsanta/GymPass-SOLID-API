import { FetchNearbyGymsService } from "../fetch-nearby-gyms"
import { GymRepository } from "@/repositories/prisma/prisma-gyms-repository"


export function makeFetchNearbyGymService(){
    const gymRepository = new GymRepository()
    const registerService = new FetchNearbyGymsService(gymRepository)

    return registerService
}