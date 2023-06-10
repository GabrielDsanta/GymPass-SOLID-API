import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistoryService } from "@/services/fetch-user-check-ins-history";

let checkInRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryService

describe('Fetch user check-in history service', () => {

    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository
        sut = new FetchUserCheckInsHistoryService(checkInRepository)
    })


    it('should be able to fetch check in history', async () => {
        await checkInRepository.create({
            gym_id: 'gym-1',
            user_id: 'user-1'
        })

        await checkInRepository.create({
            gym_id: 'gym-2',
            user_id: 'user-1'
        })

        const { checkIns } = await sut.handle({
            userId: 'user-1',
            page: 1
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([expect.objectContaining({ gym_id: 'gym-1' }), expect.objectContaining({  gym_id: 'gym-2' })])
    })

    it('should be able to fetch paginated check-in history', async () => {
        for (let i = 1; i <= 22; i++) {
            await checkInRepository.create({
                gym_id: `gym-${i}`,
                user_id: 'user-1'
            })
            
        }

        const { checkIns } = await sut.handle({
            userId: 'user-1',
            page: 2
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([expect.objectContaining({ gym_id: 'gym-21' }), expect.objectContaining({  gym_id: 'gym-22' })])
    })

})