import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'


describe('Search Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to search a gym', async () => {
        const { token } = await createAndAuthenticateUser(app)

        await request(app.server).post("/gyms").set('Authorization', `Bearer ${token}`).send({
            title: 'Test Gym',
            description: 'Some description',
            phone: '27426355',
            latitude: 21.8270638,
            longitude: -42.0198724,
        })

        await request(app.server).post("/gyms").set('Authorization', `Bearer ${token}`).send({
            title: 'Test Gym 02',
            description: 'Some description 02',
            phone: '27426355',
            latitude: 21.8270638,
            longitude: -42.0198724,
        })

        const response = await request(app.server).get('/gyms/search').query({
            name: 'Test Gym 02'
        }).set('Authorization', `Bearer ${token}`).send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms.gyms).toHaveLength(1)
        expect(response.body.gyms.gyms).toEqual([
            expect.objectContaining({
                title: 'Test Gym 02'
            })
        ])
    })
})