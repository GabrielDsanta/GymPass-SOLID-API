import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

interface GetUserMetricsParams {
    userId: string;
}
  
type GetUserMetricsServiceResponseData = {
    checkInsCount: number
}

export class GetUserMetricsService {
    constructor(private usersRepository: InMemoryCheckInsRepository) {}

    async handle({ userId }: GetUserMetricsParams): Promise<GetUserMetricsServiceResponseData> {
        const checkInsCount = await this.usersRepository.countByUserId(userId)

        return { checkInsCount }
    }
}