import { CheckIn, Prisma } from "@prisma/client";


export interface CheckInRepositoryData {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}