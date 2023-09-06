import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

class Database {

    connection: mongoose.Connection | null;

    constructor() {
        this.connection = null;
    }

    public connect(): void {
        console.log("Connecting to database...");
        const mongo_url: string = process.env.MONGO_URL || "";
        mongoose.connect(mongo_url).then(() => {
            console.log("Connected to mongo database.");
        }).catch(err => {
            console.error("Could not connect to mongo database.", err);
        });
    }

}

export default Database;