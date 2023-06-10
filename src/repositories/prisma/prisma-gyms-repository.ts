import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyData, GymRepositoryData } from "../gyms-respository";
import { prisma } from "@/lib/prisma";

export class GymRepository implements GymRepositoryData {
    async searchGym(name: string, page: number): Promise<Gym[]> {
        const gyms = await prisma.gym.findMany({
            where: {
                title: {
                    contains: name
                }
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return gyms
    }

    async findManyNearby({ latitude, longitude }: FindManyNearbyData){
        const gyms = await prisma.$queryRaw<Gym[]>`
            SELECT * from gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `

        return gyms
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = await prisma.gym.create({
            data
        })

        return gym
    }

    async findById(id: string) {
        const gym = await prisma.gym.findUnique({
            where: {
                id
            }
        })

        return gym
    }

}