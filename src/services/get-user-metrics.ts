import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository";

interface GetUserMetricsParams {
    userId: string;
}
  
type GetUserMetricsServiceResponseData = {
    checkInsCount: number
}

export class GetUserMetricsService {
    constructor(private usersRepository: PrismaCheckInRepository) {}

    async handle({ userId }: GetUserMetricsParams): Promise<GetUserMetricsServiceResponseData> {
        const checkInsCount = await this.usersRepository.countByUserId(userId)

        return { checkInsCount }
    }
}