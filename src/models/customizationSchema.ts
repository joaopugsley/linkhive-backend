import mongoose, { Schema } from "mongoose";

const customizationSchema: Schema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    profile_picture_url: {
        type: String
    },
    bio: {
        type: String,
        default: "Hi, I'm a new user on Linkhive!"
    },
    background_color: {
        type: String,
        default: "#000000"
    },
    font_color: {
        type: String,
        default: "#FFFFFF"
    },
    layout: {
        type: String
    }
});

export default mongoose.model("Customization", customizationSchema);