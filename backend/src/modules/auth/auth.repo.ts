import { prisma } from "@/config/prisma"
import { Prisma } from "@prisma/client"

export const createUser = (data: Prisma.UserCreateInput) => {
    return prisma.user.create({
        data,
        include: { profile: true }
    })
}

export const findUserByPhone = (phone: string) => {
    return prisma.user.findUnique({
        where: { phone: phone }
    })
}

export const getAllUser = () => {
    return prisma.user.findMany()
}

export const updateUserPassword = (userId: string, newPass: string) => {
    return prisma.user.update({
        where: { id: userId },
        data: { passwordHash: newPass }
    })
}
export const createRefreshToken = (token: string, userId: string, expiresAt: Date) => {
    return prisma.refreshToken.create({
        data: { token, userId, expiresAt }
    })
}

export const deleteUserRefreshToken = (userId: string) => {
    return prisma.refreshToken.findMany({
        where: { userId }
    })
}