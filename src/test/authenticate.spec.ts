import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateService } from "@/services/authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate service', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository
        sut = new AuthenticateService(usersRepository)
    })

    it('should be able to authenticate', async () => {
        await usersRepository.create({
            email: "eloviveiros@hotmail.com",
            name: "Gabriel",
            password_hash: await hash("gabrieljkl3135", 6)
        })

        const { user } = await sut.handle({
            email: "eloviveiros@hotmail.com",
            password: "gabrieljkl3135"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should note authenticate with wrong e-mail', async () => {
        expect(async () => {
            await sut.handle({
                email: "eloviveiros123@hotmail.com",
                password: "gabrieljkl3135"
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should note authenticate with wrong password', async () => {
        await usersRepository.create({
            email: "eloviveiros@hotmail.com",
            name: "Gabriel",
            password_hash: await hash("gabrieljkl3135", 6)
        })

        expect(async () => {
            await sut.handle({
                email: "eloviveiros@hotmail.com",
                password: "123456"
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

})