import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeSearchGymService } from '@/services/factories/make-search-gym'

export async function SearchGym(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        name: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const { name, page } = paramsSchema.parse(request.query)

    const searchGym = makeSearchGymService()

    const gyms = await searchGym.handle({
        name,
        page
    })

    return reply.status(200).send({
        gyms
    })

}