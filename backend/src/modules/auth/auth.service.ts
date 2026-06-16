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
    const { phone, password } = body

    const user = await authRepo.findUserByPhone(phone)

    if (!user) throw new Error(`Số điện thoại hoặc mật khẩu không đúng`)
    if (!user.isActive) throw new Error(`Tài khoản bị khóa`)

    const isMatch = await bcrypt.compare(password, user.passwordHash!)

    if (!isMatch) throw new Error(`Số điện thoại hoặc mật khẩu không đúng`)

    const accessToken = createAccessToken(user.id, user.role)
    const refreshToken = createRefreshToken(user.id, new Date())
    return {
        accessToken,
        refreshToken,
        user: { id: user.id, phone: user.phone, role: user.role }
    }
}

export const createAccessToken = (userId: string, role: Role[]) => {
    const secret = process.env.JWT_ACCESS_TOKEN
    const expiresIn = process.env.JWT_EXPIRES_IN
    if (!secret) {
        throw new Error("JWT_SECRET is missing")
    }

    if (!expiresIn) {
        throw new Error("JWT_EXPIRES_IN is missing")
    }
    const token = jwt.sign(
        { userId, role },
        secret,
        {
            expiresIn: process.env.JWT_EXPIRES_IN as any
        }
    )
    return token
}

export const createRefreshToken = async (userId: string, now: Date) => {
    const newRefreshToken = generateRefreshToken(now)
    await authRepo.createRefreshToken(
        createHash('shad256').update(newRefreshToken).digest('hex'),
        userId,
        new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // + 30 days
    )
    return newRefreshToken
}

const generateRefreshToken = (now: Date) => {
    return randomBytes(64).toString("hex") + now.getTime().toString();
};