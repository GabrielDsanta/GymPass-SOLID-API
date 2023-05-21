import { app } from "@/app";
import { Register } from "./controllers/register";
import { FastifyInstance } from "fastify";


export async function AppRoutes(app: FastifyInstance){
    app.post("/users", Register)
}