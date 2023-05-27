import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CheckInService } from "@/services/check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('Check-in service', () => {

    beforeEach(() => {
        checkInRepository = new InMemoryCheckInsRepository
        sut = new CheckInService(checkInRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to user check in', async () => {
        const checkIn = await checkInRepository.create({
            gym_id: 'gym-1',
            user_id: 'user-1'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.handle({
            gymId: 'gym-1',
            userId: 'user-1'
        })

        expect(async () => {
            await sut.handle({
                gymId: 'gym-1',
                userId: 'user-1'
            })
        }).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in twice but in different day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.handle({
            gymId: 'gym-1',
            userId: 'user-1'
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))


        const { checkIn } = await sut.handle({
            gymId: 'gym-1',
            userId: 'user-1'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

})