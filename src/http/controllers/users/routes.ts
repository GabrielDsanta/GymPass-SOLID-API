import { FastifyInstance } from "fastify";
import { Authenticate } from "./authenticate";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { Register } from "./register";
import { Profile } from "./profile";

export async function UsersRoutes(app: FastifyInstance) {
    app.post("/users", Register)
    app.post("/sessions", Authenticate)


    app.get("/me", { onRequest: [verifyJWT] }, Profile)
}