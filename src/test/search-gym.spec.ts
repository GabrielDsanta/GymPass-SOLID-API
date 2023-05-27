import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymService } from "@/services/search-gym";

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymService

describe('Fetch user check-in history service', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository
        sut = new SearchGymService(gymsRepository)
    })


    it('should be able to search for gym', async () => {
        await gymsRepository.create({
            title: 'Test Gym',
            
        })

        await gymsRepository.create({
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
            await gymsRepository.create({
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