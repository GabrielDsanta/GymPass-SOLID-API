import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUserMetricsService } from '@/services/factories/make-get-user-metrics-service'

export async function Metrics(request: FastifyRequest, reply: FastifyReply) {
    const getMetricsUser = makeGetUserMetricsService()

    const { checkInsCount } = await getMetricsUser.handle({
        userId: request.user.sub
    })

    return reply.status(200).send({
        checkInsCount
    })

}