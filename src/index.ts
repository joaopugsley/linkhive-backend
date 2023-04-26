import dotenv from "dotenv";
import express, { Express, Router } from "express";
import bodyParser from "body-parser";
import routerSetup from "./modules/router";
import Database from "./modules/database";

dotenv.config();

// router setup
const app: Express = express();
const router: Router = Router();
router.use(bodyParser.json());
routerSetup(router);
app.use("/", router);

// database setup
const db: Database = new Database();
db.connect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server running on port 3000..."));