import { prisma } from "@/config/prisma"
import { Prisma } from "@prisma/client"

export const createUser = (data: Prisma.UserCreateInput) => {
    return prisma.user.create({
        data: data
    })
}