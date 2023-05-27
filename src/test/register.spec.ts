import { UserAlreadyExistsError } from "@/errors/user-already-exists-error"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { RegisterUserService } from "@/services/register"
import { compare } from "bcryptjs"
import { beforeEach, describe, expect, it } from "vitest"


let usersRepository: InMemoryUsersRepository
let sut: RegisterUserService

describe('Register service', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository
        sut = new RegisterUserService(usersRepository)
    })

    it('should be able to register', async () => {
        const { user } = await sut.handle({
            email: 'eloviveiros@hotmail.com',
            name: 'Gabriel',
            password: 'gabrieljkl3135'
        })

        expect(user.id).toEqual(expect.any(String))

    })


    it('must be possible to encrypt the users password during registration', async () => {
        const { user } = await sut.handle({
            email: 'eloviveiros@hotmail.com',
            name: 'Gabriel',
            password: 'gabrieljkl3135'
        })

        const isPasswordCorrectlyHash = await compare(
            'gabrieljkl3135',
            user.password_hash
        )

        expect(isPasswordCorrectlyHash).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const email = 'eloviveiros@hotmail.com'

        await sut.handle({
            email,
            name: 'Gabriel',
            password: 'gabrieljkl3135'
        })

        expect(async () => {
            await sut.handle({
                email,
                name: 'Gabriel',
                password: 'gabrieljkl3135'
            })
        }).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })

})