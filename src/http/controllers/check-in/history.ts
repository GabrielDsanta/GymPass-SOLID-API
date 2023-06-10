import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { makeGetUserCheckInHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service'

export async function History(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = paramsSchema.parse(request.query)

    const historyGym = makeGetUserCheckInHistoryService()

    const { checkIns } = await historyGym.handle({
        page,
        userId: request.user.sub
    })

    return reply.status(200).send({
        checkIns
    })

}