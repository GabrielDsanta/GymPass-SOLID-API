import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'


export async function Authenticate(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = bodySchema.parse(request.body)

    try {
        const authenticateService = makeAuthenticateService()
        
        await authenticateService.handle({
            email,
            password
        })
    } catch (error) {
        if(error instanceof InvalidCredentialsError){
            reply.status(400).send({ message: error.message })
        }

        reply.status(500).send()
    }

    return reply.status(200).send()

}