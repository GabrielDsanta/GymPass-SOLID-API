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
            description: 'Test Test Gym',
            latitude: 21.8270638,
            longitude: -42.0198724,
            phone: '27426355'
        })

        await gymsRepository.create({
            title: 'Test 2 Gym',
            description: 'Test Test Gym',
            latitude: 21.8270638,
            longitude: -42.0198724,
            phone: '27426355'
        })

        const { gyms } = await sut.handle({
            name: '2',
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({ title: 'Test 2 Gym' })])
    })

    it('should be able to fetch paginated gyms search', async () => {

        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `Test Gym ${i}`,
                description: 'Test Test Gym',
                latitude: 21.8270638,
                longitude: -42.0198724,
                phone: '27426355'
            })
        }

        const { gyms } = await sut.handle({
            name: 'Test Gym',
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([ expect.objectContaining({ title: 'Test Gym 21' }), expect.objectContaining({ title: 'Test Gym 22' }) ])
    })

})