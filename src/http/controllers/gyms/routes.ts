import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { SearchGym } from "./search";
import { NearbyGym } from "./nearby";
import { CreateGym } from "./create";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function GymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/gyms/search', SearchGym)
    app.get('/gyms/nearby', NearbyGym)

    app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] } ,CreateGym)
}