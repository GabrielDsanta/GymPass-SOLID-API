import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile'
import { FastifyRequest, FastifyReply } from 'fastify'


export async function Profile(request: FastifyRequest, reply: FastifyReply) {
    const getUserProfile = makeGetUserProfileService()

    const { user } = await getUserProfile.handle({
        id: request.user.sub
    })

    return reply.status(200).send({
        user: {
            ...user,
            password_hash: undefined
        }
    })
}