import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
    await prisma.user.create({
        data: {
            name: "Gabriel",
            email: "eloviveiros@hotmail.com",
            password_hash: await hash("27426355", 6),
            role: isAdmin ? "ADMIN" : "MEMBER"
        }
    })

    const authResponse = await request(app.server).post("/sessions").send({
        email: "eloviveiros@hotmail.com",
        password: "27426355"
    })

    const { token } = authResponse.body

    return { token }
}