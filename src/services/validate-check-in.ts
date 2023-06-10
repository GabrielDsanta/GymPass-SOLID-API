import { CheckIn } from "@prisma/client";
import { CheckInRepositoryData } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInValidateError } from "@/errors/late-check-in-validate-error";

interface ValidateCheckInServiceParams {
    checkInId: string;
}

interface ValidateCheckInServiceResponseData {
    checkIn: CheckIn;
}

export class ValidateCheckInUserService {
    constructor(private checkInsRepository: CheckInRepositoryData) {}

    async handle({ checkInId }: ValidateCheckInServiceParams): Promise<ValidateCheckInServiceResponseData> {
        const checkIn = await this.checkInsRepository.findById(checkInId)

        if(!checkIn){
            throw new ResourceNotFoundError()
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes',
        )

        if(distanceInMinutesFromCheckInCreation > 20){
            throw new LateCheckInValidateError()
        }

        checkIn.validated_at = new Date()

        await this.checkInsRepository.save(checkIn)

        return { checkIn }
    }
}