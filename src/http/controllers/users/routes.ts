import { FastifyInstance } from "fastify";
import { Authenticate } from "./authenticate";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { Register } from "./register";
import { Profile } from "./profile";
import { Refresh } from "./refresh";

export async function UsersRoutes(app: FastifyInstance) {
    app.post("/users", Register)
    app.post("/sessions", Authenticate)

    app.patch("/token/refresh", Refresh)


    app.get("/me", { onRequest: [verifyJWT] }, Profile)
}