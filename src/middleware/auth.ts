import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../database/models/users';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN ?? '24h';
const expiresIn = JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'];

export async function login( username: string, password: string ): Promise< string | null > {
    try {
        const user = await User.findOne({ username })

        if(!user) {
            return null;
        }

        const passwordMatch = password === user.password

        if(!passwordMatch) {
            return null;
        }

        const token = jwt.sign({ username, id: user._id }, JWT_SECRET, { expiresIn });
        return token;
    } catch (error) {
        console.error('Login error', error);
        return null;
    }
    
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}