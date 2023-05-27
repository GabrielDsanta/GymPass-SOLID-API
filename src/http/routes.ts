import { app } from "@/app";
import { Register } from "./controllers/register";
import { FastifyInstance } from "fastify";
import { Authenticate } from "./controllers/authenticate";


export async function AppRoutes(app: FastifyInstance){
    app.post("/users", Register)
    app.post("/sessions", Authenticate)
}