import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { UsersRoutes } from './http/controllers/users/routes'
import { GymsRoutes } from './http/controllers/gyms/routes'
import { CheckInRoutes } from './http/controllers/check-in/routes'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(UsersRoutes)
app.register(GymsRoutes)
app.register(CheckInRoutes)

app.setErrorHandler((error, _, reply) => {
    if(error instanceof ZodError){
        return reply.status(400).send({
            message: 'Validation Error',
            issues: error.format()
        })
    }

    if(env.NODE_ENV !== "production"){
        console.error(error)
    }

    return reply.status(500).send({ message: 'Internal server error' })
})