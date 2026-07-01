import { Role } from '.prisma/client'
import * as authRepo from './auth.repo'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { createHash, randomBytes } from 'crypto'

dotenv.config()

export const register = async (body: {
    phone: string,
    password: string,
    fullName: string
}) => {
    const { phone, password, fullName } = body

    // Check phone is exist
    const existingPhone = await authRepo.findUserByPhone(phone)
    if (existingPhone) throw new Error('Số điện thoại đã được đăng ký')

    // Hash password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = await authRepo.createUser({
        phone,
        passwordHash,
        profile: { create: { fullName } }
    })
    return {
        message: 'Đăng ký tài khoản thành công',
        user: { id: user.id, phone: user.phone, role: user.role, profile: user.profile }
    }
}

export const login = async (body: {
    phone: string,
    password: string
}) => {
    const { phone, password } = body;

    const user = await authRepo.findUserByPhone(phone);

    if (!user) throw new Error(`Số điện thoại hoặc mật khẩu không đúng`);
    if (!user.isActive) throw new Error(`Tài khoản bị khóa`);

    const isMatch = await bcrypt.compare(password, user.passwordHash!);

    if (!isMatch) throw new Error(`Số điện thoại hoặc mật khẩu không đúng`);

    const accessToken = createAccessToken(user.id, user.role);
    const refreshToken = await createRefreshToken(user.id, new Date());
    return {
        accessToken,
        refreshToken,
        user: { id: user.id, phone: user.phone, role: user.role }
    }
}

export const changePassword = async (body: { phone: string, newPass: string }) => {
    const { phone, newPass } = body;
    if (phone.length < 10) throw new Error(`Phone number must be at least 10 number`)
    if (!newPass) {
        throw new Error('New password is required');
    }
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(newPass, salt)

    const user = await authRepo.findUserByPhone(phone)
    if (!user) {
        throw new Error('User not found');
    }
    await authRepo.updateUserPassword(user.id, passwordHash)
}

export const renewAccessToken = async (userId: string, role: Role[], refreshToken: string) => {
    const storedTokens = await authRepo.findRefreshTokenByUserID(userId);
    
    if (storedTokens.length === 0) {
        throw new Error('Refresh token không hợp lệ');
    }

    const matched = await bcrypt.compare(refreshToken, storedTokens[0].token);

    if (!matched) {
        throw new Error('Refresh token không hợp lệ');
    }

    await authRepo.deleteUserRefreshToken(userId);

    const newAccessToken = createAccessToken(userId, role);
    const newRefreshToken = await createRefreshToken(userId, new Date());
    return {
        newAccessToken,
        newRefreshToken
    }
}

// Token
export const createAccessToken = (userId: string, role: Role[]) => {
    const secret = process.env.JWT_ACCESS_TOKEN
    const expiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN
    if (!secret) {
        throw new Error("JWT_ACCESS_TOKEN is missing")
    }

    if (!expiresIn) {
        throw new Error("ACCESS_TOKEN_EXPIRES_IN is missing")
    }
    const accessToken = jwt.sign(
        { userId, role },
        secret,
        {
            expiresIn: expiresIn as any
        }
    )
    return accessToken
}

export const createRefreshToken = async (userId: string, now: Date) => {

    // Xóa các refresh token cũ của user để đảm bảo chỉ có 1 refresh token tại 1 thời điểm
    await authRepo.deleteUserRefreshToken(userId)
    const secret = process.env.JWT_REFRESH_TOKEN
    const expiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN
    if (!secret) {
        throw new Error("JWT_ACCESS_TOKEN is missing")
    }

    if (!expiresIn) {
        throw new Error("ACCESS_TOKEN_EXPIRES_IN is missing")
    }
    const refreshToken = jwt.sign(
        { userId, now },
        secret,
        {
            expiresIn: expiresIn as any
        }
    )
    const token = await bcrypt.hash(refreshToken, 10);
    await authRepo.createRefreshToken(
        token,
        userId,
        7 * 24 * 60 * 60, // 7 days in seconds
        new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // + 7 days
    )
    return refreshToken
}