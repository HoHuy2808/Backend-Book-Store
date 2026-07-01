import { prisma } from "@/config/prisma"
import { redis } from "@/config/redis"
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
export const createRefreshToken = async (token: string, userId: string, expiresInSec: number, expiresAt: Date) => {
    const record = await prisma.refreshToken.create({
        data: { token, userId, expiresAt }
    });
    await redis.set(`refresh_token:${userId}`, token, 'EX', expiresInSec);
    return record;
}

export const deleteUserRefreshToken = async (userId: string) => {
    await prisma.refreshToken.deleteMany({
        where: { userId }
    });
    await redis.del(`refresh_token:${userId}`);
}

export const findRefreshTokenByUserID = async (userId: string) => {
    const cachedToken = await redis.get(`refresh_token:${userId}`);
    if (cachedToken) {
        return [{ token: cachedToken, userId }];
    }

    const dbTokens = await prisma.refreshToken.findMany({
        where: { userId }
    });

    if (dbTokens.length > 0) {
        const expiresInSec = Math.max(0, Math.floor((dbTokens[0].expiresAt.getTime() - Date.now()) / 1000));
        if (expiresInSec > 0) {
            await redis.set(`refresh_token:${userId}`, dbTokens[0].token, 'EX', expiresInSec);
        }
    }

    return dbTokens;
}