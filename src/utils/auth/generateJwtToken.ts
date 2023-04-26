import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

function generateJwtToken(userId: string): string {
    const secret = process.env.JWT_SECRET_TOKEN;

    if(!secret) {
        throw new Error("JWT secret token not provided");
    }

    const token = jwt.sign({ userId: userId }, secret, { expiresIn: "1h", algorithm: "HS384" });

    return token;

}

export default generateJwtToken;