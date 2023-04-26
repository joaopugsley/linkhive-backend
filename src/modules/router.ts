import { Router, Request, Response } from "express";
import rateLimit from "express-rate-limit";

// controllers
import loginController from "../controllers/loginController";
import registerController from "../controllers/registerController";
import profileController from "../controllers/profileController";

// utils
import authMiddleware from "../utils/auth/authMiddleware";

// rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: JSON.stringify({message: "Too many requests, please try again later."})
});

export default function routerSetup(router: Router) {

    router.get("/", (req: Request, res: Response) => {
        res.status(200).json({message: "Hello World!"});
    });

    router.post("/register", limiter, registerController);

    router.post("/login", limiter, loginController)

    router.get("/api/v1/check-username", limiter, profileController.checkUsername);

    router.put("/api/v1/update-bio", limiter, authMiddleware, profileController.updateBio);

    router.put("/api/v1/update-profile-picture", limiter, authMiddleware, profileController.updateProfilePicture);

    router.put("/api/v1/update-background-color", limiter, authMiddleware, profileController.updateBackgroundColor);

    router.put("/api/v1/update-font-color", limiter, authMiddleware, profileController.updateFontColor);

    router.put("/api/v1/update-profile-layout", limiter, authMiddleware, profileController.updateProfileLayout);

}