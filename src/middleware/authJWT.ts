import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export interface JwtPayload {
    username: string;
    iat: number;
    exp: number;
}

interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export function authenticateJWT(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No autorizado, falta token' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = payload; // sin "as any", ahora tipado
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido o expirado' });
    }
}
