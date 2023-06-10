import { Gym } from "@prisma/client";
import { GymRepositoryData } from "@/repositories/gyms-respository";

interface FetchNearbyGymsServiceParams {
   userLatitude: number;
   userLongitude: number;
}

interface FetchNearbyGymsResponseData {
    gyms: Gym[];
}

export class FetchNearbyGymsService {
    constructor(private checkInsRepository: GymRepositoryData) { }

    async handle({ userLatitude, userLongitude }: FetchNearbyGymsServiceParams ): Promise<FetchNearbyGymsResponseData> {
        const gyms = await this.checkInsRepository.findManyNearby({ latitude: userLatitude, longitude: userLongitude})

        return { gyms }
    }
}