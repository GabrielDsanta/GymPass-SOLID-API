import { expect, describe, it, beforeEach } from "vitest";
import { GetUserMetricsService } from "@/services/get-user-metrics";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsService
describe('Get user metrics service', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository
        sut = new GetUserMetricsService(checkInsRepository)
    })

    it('should be able to get a user by id', async () => {
        await checkInsRepository.create({
            gym_id: 'gym-1',
            user_id: 'user-1'
        })

        await checkInsRepository.create({
            gym_id: 'gym-2',
            user_id: 'user-1'
        })

        const { checkInsCount } = await sut.handle({
            userId: 'user-1'
        })

        expect(checkInsCount).toEqual(2)
    })

})