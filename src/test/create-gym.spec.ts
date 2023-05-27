import { UserAlreadyExistsError } from "@/errors/user-already-exists-error"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { CreateGymService } from "@/services/create-gym"
import { compare } from "bcryptjs"
import { beforeEach, describe, expect, it } from "vitest"


let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create Gym service', () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository
        sut = new CreateGymService(gymsRepository)
    })

    it('should be able to create a gym', async () => {
        const { gym } = await sut.handle({
            title: 'Test Gym',
            description: 'Test Test Gym',
            latitude: 21.8270638,
            longitude: -42.0198724,
            phone: '27426355'
        })

        expect(gym.id).toEqual(expect.any(String))
    })


})