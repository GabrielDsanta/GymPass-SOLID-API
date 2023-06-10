import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in'


export async function Validate(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        checkInId: z.string().uuid()
    })

    const { checkInId } = paramsSchema.parse(request.params)

    const validateCheckin = makeValidateCheckInService()

    await validateCheckin.handle({
        checkInId
    })

    return reply.status(204).send()

}