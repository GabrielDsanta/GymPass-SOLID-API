import { CheckIn } from "@prisma/client";
import { CheckInRepositoryData } from "@/repositories/check-ins-repository";

interface FetchUserCheckInsHistoryServiceParams {
   userId: string;
   page: number;
}

interface FetchUserCheckInsHistoryResponseData {
    checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryService {
    constructor(private checkInsRepository: CheckInRepositoryData) { }

    async handle({ userId, page }: FetchUserCheckInsHistoryServiceParams ): Promise<FetchUserCheckInsHistoryResponseData> {
        const checkIns = await this.checkInsRepository.findManyCheckInsByUserId(userId, page)

        return { checkIns }
    }
}