import dotenv from "dotenv";
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();

// models
import userSchema from "../../models/userSchema";

// types
import CustomRequest from "../../types/customRequest";

function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({
            message: "No token provided."
        })
    }

    const splittedHeader = authHeader.split(" ");

    if(splittedHeader.length !== 2) {
        return res.status(401).json({
            message: "Token malformatted."
        })
    }

    if(splittedHeader[0] !== "Bearer") {
        return res.status(401).json({
            message: "Token malformatted."
        })
    }

    const token: string = splittedHeader[1];

    const secret = process.env.JWT_SECRET_TOKEN;

    if(!secret) {
        throw new Error("JWT secret token not provided");
    }

    jwt.verify(token, secret, { algorithms: ["HS384"], complete: true }, function (err: any, decoded: JwtPayload | undefined) {

        if(err) {
            return res.status(401).json({
                message: "Invalid token."
            })
        }

        if(!decoded || !decoded.payload.userId) {
            return res.status(401).json({
                message: "Invalid token."
            })
        }

        const currentTime: number = Math.floor(Date.now() / 1000);

        if(decoded.payload.exp && decoded.payload.exp < currentTime) {
            return res.status(401).json({
                message: "Token expired."
            })
        }

        const userId: string = decoded.payload.userId;

        userSchema.findById(userId)
        .then((user) => {

            if(!user) {
                return res.status(401).json({
                    message: "Invalid token."
                })
            }

            req.userId = userId;
            next();

        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({
                message: "Internal server error."
            })
        })

    })
  
}

export default authMiddleware;