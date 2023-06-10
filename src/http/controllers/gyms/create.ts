import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeCreateGymService } from '@/services/factories/make-create-gym-service'

export async function CreateGym(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { title, description, phone, latitude, longitude } = bodySchema.parse(request.body)

    const createGym = makeCreateGymService()

    await createGym.handle({
        title,
        phone,
        description,
        latitude,
        longitude
    })

    return reply.status(201).send()

}