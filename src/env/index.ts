import { config } from "dotenv"
import { z } from "zod"

if(process.env.NODE_ENV === "test"){
    config({
        path: ".env.test"
    })
} else{
    config()
}

const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
    JWT_SECRET: z.string(),
    PORT: z.coerce.number().default(3333),
})

const isEnvValid =  envSchema.safeParse(process.env)

if(isEnvValid.success === false){
    console.error(`Invalid environment variable ! ${isEnvValid.error.format()}`)
    throw new Error("Invalid environment variable !")
}

export const env = isEnvValid.data