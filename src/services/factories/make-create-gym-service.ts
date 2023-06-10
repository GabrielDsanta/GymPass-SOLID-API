import { CreateGymService } from "../create-gym"
import { GymRepository } from "@/repositories/prisma/prisma-gyms-repository"


export function makeCreateGymService(){
    const gymRepository = new GymRepository()
    const registerService = new CreateGymService(gymRepository)

    return registerService
}