import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { Create } from "./create";
import { Validate } from "./validate";
import { History } from "./history";
import { Metrics } from "./metrics";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function CheckInRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/check-ins/history', History)
    app.get('/check-ins/metrics', Metrics)

    app.post('/gyms/:gymId/checkIn', Create)
    app.patch('/check-ins/:checkInId/validate', { onRequest: [verifyUserRole('ADMIN')] } ,Validate)
}