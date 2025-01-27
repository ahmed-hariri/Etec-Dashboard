import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import { authRoutes } from "./routes/authentication";

const app: express.Application = express();
app.use(express.json(), cors());
dotenv.config();

/*---> Mounting the authentication routes on the "/auth" path <---*/
app.use("/auth", authRoutes);


mongoose.connect(process.env.MONGO_URL ?? '')
    .then(() => {
        const port = process.env.PORT
        app.listen(port ?? 3000, () => console.log("hello world!"))
    }).catch((error) => console.error("Error connecting to the database:", error))