import { Gym } from "@prisma/client";
import { GymRepositoryData } from "@/repositories/gyms-respository";
import { randomUUID } from "crypto";

interface CreateGymServiceParams {
    description: string | null;
    title: string;
    phone: string | null;
    latitude: number;
    longitude: number;
}

interface CreateGymServiceResponseData {
    gym: Gym;
}

export class CreateGymService {
    constructor(private gymsRepository: GymRepositoryData) { }

    async handle({ description, title, latitude, longitude, phone }: CreateGymServiceParams): Promise<CreateGymServiceResponseData> {
        const gym = await this.gymsRepository.create({
            id: randomUUID(),
            title,
            latitude,
            longitude,
            description,
            phone
        })

        return { gym }
    }
}