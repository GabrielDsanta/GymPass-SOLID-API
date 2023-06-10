import { SearchGymService } from "../search-gym"
import { GymRepository } from "@/repositories/prisma/prisma-gyms-repository"


export function makeSearchGymService(){
    const gymRepository = new GymRepository()
    const registerService = new SearchGymService(gymRepository)

    return registerService
}