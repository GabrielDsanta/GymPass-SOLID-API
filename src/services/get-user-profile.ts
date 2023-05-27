import { UsersRepositoryData } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

interface GetUserProfileParams {
    id: string;
}
  
type GetUserProfileServiceResponseData = {
    user: User;
}

export class GetUserProfileService {
    constructor(private usersRepository: UsersRepositoryData) {}

    async handle({ id }: GetUserProfileParams): Promise<GetUserProfileServiceResponseData> {
        const user = await this.usersRepository.findById(id)

        if(!user){
            throw new ResourceNotFoundError
        }

        return { user }
    }
}