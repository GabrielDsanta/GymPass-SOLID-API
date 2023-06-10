import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
    await request(app.server).post("/users").send({
        name: "Gabriel Santana",
        email: "eloviveiros@hotmail.com",
        password: "27426355"
    })

    const authResponse = await request(app.server).post("/sessions").send({
        email: "eloviveiros@hotmail.com",
        password: "27426355"
    })

    const { token } = authResponse.body

    return { token }
}