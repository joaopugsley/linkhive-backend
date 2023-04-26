import { Request, Response } from "express";
import bcrypt from "bcrypt";

// utils
import validateEmail from "../utils/validateEmail";
import generateJwtToken from "../utils/auth/generateJwtToken";

// models
import userSchema from "../models/userSchema";

const loginController = async (req: Request, res: Response) => {
    
    const email: string = req.body.email?.toString();
    const password: string = req.body.password?.toString();

    if(!email || !password) {
        return res.status(400).json({
            message: "Bad request."
        })
    }

    if(!validateEmail(email)) {
        return res.status(400).json({
            message: "You must provide a valid email address."
        })
    }

    if(password.length < 8 || password.length > 100) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long."
        })
    }

    const user = await userSchema.findOne({email: email});

    if(!user) {
        return res.status(400).json({
            message: "Invalid email or password."
        })
    }

    const match: boolean = await bcrypt.compare(password, user.password);

    if(!match) {
        return res.status(400).json({
            message: "Invalid email or password."
        })
    }

    const userId: string | undefined = user._id?.valueOf().toString();

    if(!userId) {
        return res.status(500).json({
            message: "Internal server error."
        })
    }

    const jwtToken = generateJwtToken(userId);

    return res.status(200).json({
        message: "Login successful.",
        token: jwtToken
    })
    
}

export default loginController;