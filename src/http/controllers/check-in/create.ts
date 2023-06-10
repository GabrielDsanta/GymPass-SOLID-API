import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeCheckInService } from '@/services/factories/make-check-in-service'


export async function Create(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        gymId: z.string().uuid()
    })

    const bodySchema = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { gymId } = paramsSchema.parse(request.params)
    const { latitude, longitude } = bodySchema.parse(request.body)

    const registerService = makeCheckInService()

    await registerService.handle({
        gymId,
        userLatitude: latitude,
        userLongitude: longitude,
        userId: request.user.sub
    })

    return reply.status(201).send()

}