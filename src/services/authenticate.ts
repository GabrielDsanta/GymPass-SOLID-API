import { UsersRepositoryData } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateParams {
    email: string;
    password: string;
}

interface AuthenticateServiceResponseData {
    user: User;
}

export class AuthenticateService {
    constructor(private usersRepository: UsersRepositoryData) { }

    async handle({ email, password }: AuthenticateParams): Promise<AuthenticateServiceResponseData> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return { user }
    }
}