import { CheckIn } from "@prisma/client";
import { CheckInRepositoryData } from "@/repositories/check-ins-repository";

interface CheckInServiceParams {
    userId: string;
    gymId: string;
}
  
interface CheckInServiceResponseData {
    checkIn: CheckIn;
}

export class CheckInService {
    constructor(private checkInsRepository: CheckInRepositoryData) {}

    async handle({ userId, gymId }: CheckInServiceParams): Promise<CheckInServiceResponseData> {
        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())
        
        if(checkInOnSameDate){
            throw new Error()
        }
        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId
        })

        return { checkIn }
    }
}