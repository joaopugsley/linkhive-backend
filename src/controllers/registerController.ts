import { Request, Response } from "express";
import bcrypt from "bcrypt";

// utils
import validateEmail from "../utils/validateEmail";
import validatePassword from "../utils/validatePassword";

// models
import userSchema from "../models/userSchema";
import customizationSchema from "../models/customizationSchema";

const registerController = async (req: Request, res: Response) => {
    
    const username: string = req.body.username?.toString();
    const email: string = req.body.email?.toString();
    const password: string = req.body.password?.toString();

    if(!username || !email || !password) {
        return res.status(400).json({
            message: "Bad request."
        })
    }

    if(username.length < 3 || username.length > 32) {
        return res.status(400).json({
            message: "Username must be between 3 and 32 characters."
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

    if(!validatePassword(password)) {
        return res.status(400).json({
            message: "Password must contain at least one upper case character, one lower case character, one number and one special symbol."
        })
    }

    const usernameExists: boolean = await userSchema.findOne({ username: username }).exec() !== null;

    if(usernameExists === true) {
        return res.status(400).json({
            message: "Username already taken."
        })
    }

    const emailExists: boolean = await userSchema.findOne({ email: email }).exec() !== null;

    if(emailExists === true) {
        return res.status(400).json({
            message: "Email already registered."
        })
    }

    const encryptedPassword: string = await bcrypt.hash(password, 10);

    const newUser = new userSchema({
        username: username,
        email: email,
        password: encryptedPassword
    })

    newUser.save()
    .then((user) => {

        const userCustomization = new customizationSchema({
            user: user._id
        })

        userCustomization.save()
        .then(() => {
            return res.status(201).json({
                message: "User successfully registered."
            })
        })
        .catch(err => {
            console.error("Error saving user:", err)
            return res.status(500).json({
                message: "Internal server error."
            })
        })
        
    })
    .catch(err => {
        console.error("Error saving user:", err)
        return res.status(500).json({
            message: "Internal server error."
        })
    })

}

export default registerController;