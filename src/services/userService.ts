import userSchema from "../models/userSchema";
import customizationSchema from "../models/customizationSchema";

class UserService {

    public async checkUsername(username: string): Promise<boolean> {

        try {

            const usernameExists: boolean = await userSchema.findOne({ username: username }).exec() !== null;

            if(usernameExists) {
                return false;
            }

            return true;

        } catch(err) {

            console.error(err);
            return false;

        }

    }

    public async updateBio(userId: string, newBio: string): Promise<boolean> {

        try {

            await customizationSchema.findOneAndUpdate({ user: userId }, { 
                $set: { bio: newBio } 
            });

            return true;

        } catch(err) {

            console.error(err);
            return false;

        }

    }

    public async updateProfilePicture(userId: string, newUrl: string): Promise<boolean> {

        try {

            await customizationSchema.findOneAndUpdate({ user: userId }, { 
                $set: { profile_picture_url: newUrl } 
            });

            return true;

        } catch(err) {

            console.error(err);
            return false;

        }

    }

    public async updateBackgroundColor(userId: string, newColor: string): Promise<boolean> {

        try {

            await customizationSchema.findOneAndUpdate({ user: userId }, {
                $set: { background_color: newColor }
            });

            return true;

        } catch(err) {

            console.error(err);
            return false;

        }
        
    }

    public async updateFontColor(userId: string, newColor: string): Promise<boolean> {

        try {

            await customizationSchema.findOneAndUpdate({ user: userId }, {
                $set: { font_color: newColor }
            })

            return true;

        } catch(err) {
            
            console.error(err);
            return false;

        }
        
    }

    public async updateLayout(userId: string, newLayout: string): Promise<boolean> {

        try {

            await customizationSchema.findOneAndUpdate({ user: userId }, {
                $set: { layout: newLayout }
            })

            return true;

        } catch(err) {

            console.error(err);
            return false;

        }

    }

}

export default new UserService();