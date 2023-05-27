import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CheckInService } from "@/services/check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime";
import { MaxNumbersOfCheckInsError } from "@/errors/max-numbers-of-check-ins-error";
import { MaxDistanceError } from "@/errors/max-distance-error";

let checkInRepository: InMemoryCheckInsRepository
let gymRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check-in service', () => {

    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository
        gymRepository = new InMemoryGymsRepository
        sut = new CheckInService(checkInRepository, gymRepository)

        await gymRepository.create({
            id: 'gym-1',
            title: 'Academia Teste',
            latitude: -21.8270638,
            longitude: -42.0198724,
            phone: '27426355',
            description: 'Teste'
        })

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
            userId: 'user-1',
            userLatitude: -21.8270638,
            userLongitude: -42.0198724,
        })

        expect(async () => {
            await sut.handle({
                gymId: 'gym-1',
                userId: 'user-1',
                userLatitude: -21.8270638,
                userLongitude: -42.0198724,
            })
        }).rejects.toBeInstanceOf(MaxNumbersOfCheckInsError)
    })

    it('should be able to check in twice but in different day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.handle({
            gymId: 'gym-1',
            userId: 'user-1',
            userLatitude: -21.8270638,
            userLongitude: -42.0198724,
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))


        const { checkIn } = await sut.handle({
            gymId: 'gym-1',
            userId: 'user-1',
            userLatitude: -21.8270638,
            userLongitude: -42.0198724,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to user check in on distant gym', async () => {

        gymRepository.items.push({
            id: 'gym-2',
            title: 'Academia Teste',
            latitude: new Decimal(-22.2134272),
            longitude: new Decimal(-42.5885696),
            phone: '27426355',
            description: 'Teste'
        })

        expect(async () => {
            await sut.handle({
                gymId: 'gym-2',
                userId: 'user-1',
                userLatitude: -21.8270638,
                userLongitude: -42.0198724,
            })
        }).rejects.toBeInstanceOf(MaxDistanceError)
    })

})