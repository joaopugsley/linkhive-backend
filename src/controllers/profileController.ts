import { Request, Response } from "express";

// services
import UserService from "../services/userService";

// utils
import validateImage from "../utils/validateImage";
import validateHexColor from "../utils/validateHexColor";
import validateLayout from "../utils/validateLayout";

// types
import CustomRequest from "../types/customRequest";

class ProfileController {

    public async checkUsername(req: CustomRequest, res: Response) {

        const username: string | undefined = req.query.username?.toString();

        if(!username) {
            return res.status(400).json({
                message: "Username is required."
            })
        }

        if(username.length < 3 || username.length > 32) {
            return res.status(400).json({
                message: "Username must be between 3 and 32 characters."
            })
        }

        const result: boolean = await UserService.checkUsername(username);

        if(!result) {
            return res.status(409).json({
                message: "Username already taken."
            })
        }

        return res.status(200).json({
            message: "Username available."
        })

    }

    public async updateBio(req: CustomRequest, res: Response) {

        const userId: string | undefined = req.userId;
        const newBio: string | undefined = req.body.bio?.toString();

        if(!userId || !newBio) {
            return res.status(400).json({
                message: "Bad Request."
            })
        }

        if(newBio.length > 150) {
            return res.status(400).json({
                message: "Bio cannot be longer than 150 characters."
            })
        }

        const result: boolean = await UserService.updateBio(userId, newBio);

        if(!result) {
            return res.status(500).json({
                message: "Internal server error."
            })
        }

        res.status(200).json({
            message: "Bio sucessfully updated."
        })

    }

    public async updateProfilePicture(req: CustomRequest, res: Response) {

        const userId: string | undefined = req.userId;
        const newPic: string | undefined = req.body.url?.toString();

        if(!userId || !newPic) {
            return res.status(400).json({
                message: "Bad Request."
            })
        }

        if(!validateImage(newPic) || newPic.length < 3) {
            return res.status(400).json({
                message: "You must provide a link that points to a valid image file (JPG, JPEG, PNG, APNG, GIF, SVG, WEBP)."
            })
        }

        const result: boolean = await UserService.updateProfilePicture(userId, newPic);

        if(!result) {
            return res.status(500).json({
                message: "Internal server error."
            })
        }

        res.status(200).json({
            message: "Profile Picture sucessfully updated."
        })

    }

    public async updateBackgroundColor(req: CustomRequest, res: Response) {

        const userId: string | undefined = req.userId;
        const backgroundColor: string | undefined = req.body.color?.toString();

        if(!userId || !backgroundColor) {
            return res.status(400).json({
                message: "Bad Request."
            })
        }

        if(!validateHexColor(backgroundColor)) {
            return res.status(400).json({
                message: "You must provide a valid hex color."
            })
        }

        const result: boolean = await UserService.updateBackgroundColor(userId, backgroundColor);

        if(!result) {
            return res.status(500).json({
                message: "Internal server error."
            })
        }

        res.status(200).json({
            message: "Background color sucessfully updated."
        })

    }

    public async updateFontColor(req: CustomRequest, res: Response) {

        const userId: string | undefined = req.userId;
        const fontColor: string | undefined = req.body.color?.toString();

        if(!userId || !fontColor) {
            return res.status(400).json({
                message: "Bad Request."
            })
        }

        if(!validateHexColor(fontColor)) {
            return res.status(400).json({
                message: "You must provide a valid hex color."
            })
        }

        const result: boolean = await UserService.updateFontColor(userId, fontColor);

        if(!result) {
            return res.status(500).json({
                message: "Internal server error."
            })
        }

        res.status(200).json({
            message: "Font color sucessfully updated."
        })

    }

    public async updateProfileLayout(req: CustomRequest, res: Response) {

        const userId: string | undefined = req.userId;
        const newLayout = req.body.layout;

        if(!userId || !newLayout) {
            return res.status(400).json({
                message: "Bad Request."
            })
        }

        if(typeof newLayout !== "object") {
            return res.status(400).json({
                message: "Bad Request."
            })
        }

        if(!validateLayout(newLayout)) {
            return res.status(400).json({
                message: "You must provide a valid layout."
            })
        }

        const stringLayout: string = JSON.stringify(newLayout);

        const result: boolean = await UserService.updateLayout(userId, stringLayout);

        if(!result) {
            return res.status(500).json({
                message: "Internal server error."
            })
        }

        res.status(200).json({
            message: "Profile layout sucessfully updated."
        })


    }

}

export default new ProfileController();