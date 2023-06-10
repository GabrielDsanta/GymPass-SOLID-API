import { UsersRepositoryData } from "@/repositories/users-repository";
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import { User } from "@prisma/client";

interface RegisterServiceParams {
    name: string;
    email: string;
    password: string;
}

interface UserServiceResponseData {
    user: User
}

export class RegisterUserService {
    constructor(private usersRepository: UsersRepositoryData) {}

    async handle({ email, name, password }: RegisterServiceParams): Promise<UserServiceResponseData> {
        const password_hash = await hash(password, 6)
    
        const isEmailInUse = await this.usersRepository.findByEmail(email)
    
        if (isEmailInUse) {
            throw new UserAlreadyExistsError()
        }
    
        const user = await this.usersRepository.create({
            name,
            email,
            password_hash
        })

        return { user }
    }
}