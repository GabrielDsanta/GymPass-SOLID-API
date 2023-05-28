import { expect, describe, it, beforeEach } from "vitest";
import { FetchNearbyGymsService } from "@/services/fetch-nearby-gyms";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsService

describe('Fetch nearby gyms service', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository
        sut = new FetchNearbyGymsService(gymsRepository)
    })


    it('should be able to fetch nearby gyms', async () => {
        await gymsRepository.create({
            title: 'Near Gym',
            description: 'Test Test Gym',
            latitude: 21.8270638,
            longitude: -42.0198724,
            phone: '27426355'
        })

        await gymsRepository.create({
            title: 'Far Gym',
            description: 'Test Test Gym',
            latitude: -10.8362202,
            longitude: -48.632614,
            phone: '27426355'
        })

        const { gyms } = await sut.handle({
            userLatitude: 21.8270638,
            userLongitude: -42.0198724,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
    })
})