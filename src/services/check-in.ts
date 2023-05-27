import { CheckIn } from "@prisma/client";
import { CheckInRepositoryData } from "@/repositories/check-ins-repository";
import { GymRepositoryData } from "@/repositories/gyms-respository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "@/errors/max-distance-error";
import { MaxNumbersOfCheckInsError } from "@/errors/max-numbers-of-check-ins-error";

interface CheckInServiceParams {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckInServiceResponseData {
    checkIn: CheckIn;
}

const MAX_DISTANCE_IN_KM = 0.1

export class CheckInService {
    constructor(private checkInsRepository: CheckInRepositoryData, private gymsRepository: GymRepositoryData) { }

    async handle({ userId, gymId, userLatitude, userLongitude }: CheckInServiceParams): Promise<CheckInServiceResponseData> {
        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

        if (checkInOnSameDate) {
            throw new MaxNumbersOfCheckInsError()
        }

        const distance = getDistanceBetweenCoordinates(
            {
                latitude: userLatitude,
                longitude: userLongitude
            },
            {
                latitude: gym.latitude.toNumber(),
                longitude: gym.longitude.toNumber()
            }
        )

        if(distance > MAX_DISTANCE_IN_KM){
            throw new MaxDistanceError()
        }

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId
        })

        return { checkIn }
    }
}