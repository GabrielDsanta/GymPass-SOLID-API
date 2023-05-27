import { Gym, Prisma } from "@prisma/client";
import { GymRepositoryData } from "../gyms-respository";
import { randomUUID } from "crypto";


export class InMemoryGymsRepository implements GymRepositoryData {
    public items: Gym[] = []

    async findById(id: string){
        const findGym = this.items.find(item => item.id === id)

        if(!findGym){
            return null
        }

        return findGym
    }

    async searchGym(name: string, page: number){
        return this.items.filter(item => item.title.includes(name)).slice((page - 1) * 20, page * 20)
    }

    async create(data: Prisma.GymCreateInput){
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            created_at: new Date()
        }

        this.items.push(gym)

        return gym
    }
}