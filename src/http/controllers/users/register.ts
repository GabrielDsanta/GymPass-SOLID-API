import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { makeRegisterUserService } from '@/services/factories/make-register-user-service'


export async function Register(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = bodySchema.parse(request.body)

    try {
        const registerService = makeRegisterUserService()

        await registerService.handle({
            name,
            email,
            password
        })
    } catch (error) {
        if(error instanceof UserAlreadyExistsError){
            reply.status(409).send({ message: error.message })
        }

        reply.status(500).send()
    }

    return reply.status(201).send()

}