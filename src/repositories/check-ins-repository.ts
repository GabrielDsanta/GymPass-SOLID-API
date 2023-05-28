import { CheckIn, Prisma } from "@prisma/client";


export interface CheckInRepositoryData {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findManyCheckInsByUserId(userId: string, page: number): Promise<CheckIn[]>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    countByUserId(userId: string): Promise<number>
    findById(id: string): Promise<CheckIn | null>
    save(checkIn: CheckIn): Promise<CheckIn>
}