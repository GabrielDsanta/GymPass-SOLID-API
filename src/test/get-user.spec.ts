import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { GetUserProfileService } from "@/services/get-user-profile";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get user profile service', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository
        sut = new GetUserProfileService(usersRepository)
    })

    it('should be able to get a user by id', async () => {
        const { id } = await usersRepository.create({
            email: "eloviveiros@hotmail.com",
            name: "Gabriel",
            password_hash: await hash("gabrieljkl3135", 6)
        })

        const { user } = await sut.handle({ id })

        expect(user.id).toEqual(id)
    })

    it('should not be able to get a user with wrong id', async () => {
        expect(async ()=> {
            await sut.handle({ id: 'non-existing-id' })
        }).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

})