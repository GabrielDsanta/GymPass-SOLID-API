import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { RegisterService } from "@/services/register"


export async function Register(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = createUserBodySchema.parse(request.body)

    try {
        await RegisterService({ name, email, password })
    } catch (error) {
        reply.status(409).send()
    }

    return reply.status(201).send()

}