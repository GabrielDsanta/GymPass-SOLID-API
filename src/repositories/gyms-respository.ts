import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearbyData {
    latitude: number;
    longitude: number
}

export interface GymRepositoryData {
    searchGym(name: string, page: number): Promise<Gym[]>
    findManyNearby({ latitude, longitude }: FindManyNearbyData): Promise<Gym[]>
    create(data: Prisma.GymCreateInput): Promise<Gym>
    findById(id: string): Promise<Gym | null>
}