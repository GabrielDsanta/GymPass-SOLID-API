import { prisma } from "@/lib/prisma"
import { PrismaUserReposity } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs"

interface RegisterServiceParams {
    name: string;
    email: string;
    password: string;
}

export async function RegisterService({ email, name, password }: RegisterServiceParams) {
    const password_hash = await hash(password, 6)

    const isEmailInUse = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (isEmailInUse) {
        throw new Error('E-mail already exists')
    }

    const prismaUsersRepository = new PrismaUserReposity()
    prismaUsersRepository.create({
        name,
        email,
        password_hash
    })
}