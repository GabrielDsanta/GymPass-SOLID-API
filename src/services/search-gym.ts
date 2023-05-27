import { Gym } from "@prisma/client";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { GymRepositoryData } from "@/repositories/gyms-respository";

interface SearchGymParams {
    name: string;
    page: number;
}

type SearchGymServiceResponseData = {
    gyms: Gym[];
}

export class SearchGymService {
    constructor(private gymsRepository: GymRepositoryData) { }

    async handle({ name, page }: SearchGymParams): Promise<SearchGymServiceResponseData> {
        const gyms = await this.gymsRepository.searchGym(name, page)

        if (!gyms) {
            throw new ResourceNotFoundError()
        }

        return { gyms }
    }
}