import userSchema from "../models/userSchema";
import customizationSchema from "../models/customizationSchema";

class UserService {

    /**
    * @description Checa a disponibilidade de um nome de usuário.
    * @param {string} username Nome de usuário a ser checado.
    * @returns {boolean} A disponibilidade do nome de usuário.
    */
    public async checkUsername(username: string): Promise<boolean> {

        try {

            const usernameExists: boolean = await userSchema.findOne({ username: { $regex: new RegExp(username, "i") }}).exec() !== null;

            if(usernameExists) {
                return false;
            }

            return true;

        } catch(err) {

            console.error(err);
            return false;

        }

    }

    /**
    * @description Checa a disponibilidade de um email.
    * @param {string} email Email a ser checado.
    * @returns {boolean} A disponibilidade de um email.
    */
    public async checkEmail(email: string): Promise<boolean> {

        try {

            const emailExists: boolean = await userSchema.findOne({ email: { $regex: new RegExp(email, "i") }}).exec() !== null;

            if(emailExists) {
                return false;
            }

            return true;

        } catch(err) {

            console.error(err);
            return false;

        }

    }

    /**
    * @description Atualiza a biografia de um usuário.
    * @param {string} userId ID do usuário a ser atualizado.
    * @param {string} newBio Nova biografia do usuário.
    * @returns {boolean} Se foi possível atualizar a biografia do usuário.
    */
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

    /**
    * @description Atualiza a URL de foto de perfil de um usuário.
    * @param {string} userId ID do usuário a ser atualizado.
    * @param {string} newUrl Nova URL de foto do perfil.
    * @returns {boolean} Se foi possível atualizar a foto de perfil do usuário.
    */
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

    /**
    * @description Atualiza a cor de fundo de um usuário.
    * @param {string} userId ID do usuário a ser atualizado.
    * @param {string} newColor Nova cor de fundo do usuário.
    * @returns {boolean} Se foi possível atualizar a cor de fundo do usuário.
    */
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

    /**
    * @description Atualiza a cor de fonte de um usuário.
    * @param {string} userId ID do usuário a ser atualizado.
    * @param {string} newColor Nova cor de fonte do usuário.
    * @returns {boolean} Se foi possível atualizar a cor de fonte do usuário.
    */
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

    /**
    * @description Atualiza o layout de um usuário.
    * @param {string} userId ID do usuário a ser atualizado.
    * @param {string} newLayout Novo layout do usuário - JSON em formato de string.
    * @returns {boolean} Se foi possível atualizar o layout do usuário.
    */
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