import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'


describe('Nearby Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to list a nearby gyms', async () => {
        const { token } = await createAndAuthenticateUser(app)

        await request(app.server).post("/gyms").set('Authorization', `Bearer ${token}`).send({
            title: 'Near Gym',
            description: 'Test Test Gym',
            latitude: 21.8270638,
            longitude: -42.0198724,
            phone: '27426355'
        })

        await request(app.server).post("/gyms").set('Authorization', `Bearer ${token}`).send({
            title: 'Far Gym',
            description: 'Test Test Gym',
            latitude: -10.8362202,
            longitude: -48.632614,
            phone: '27426355'
        })

        const response = await request(app.server).get('/gyms/nearby').query({
            latitude: 21.8270638,
            longitude: -42.0198724
        }).set('Authorization', `Bearer ${token}`).send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Near Gym'
            })
        ])
    })
})