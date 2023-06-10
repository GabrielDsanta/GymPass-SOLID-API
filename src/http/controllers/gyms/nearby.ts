import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeFetchNearbyGymService } from '@/services/factories/make-fetch-nearby-gyms-service'

export async function NearbyGym(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { latitude, longitude } = paramsSchema.parse(request.query)

    const fetchNearbyGyms = makeFetchNearbyGymService()

    const { gyms } = await fetchNearbyGyms.handle({
        userLatitude: latitude,
        userLongitude: longitude
    })

    return reply.status(200).send({
        gyms
    })

}