import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import { authRoutes } from "./routes/authentication";
import { productRoutes } from './routes/product';
import { categoryRoutes } from './routes/category/index';
import { orderRoutes } from './routes/order';
import { clientRoutes } from './routes/client';

const app: express.Application = express();
app.use(express.json());
app.use(cors());

/*---> Mounting the authentication routes on the "/auth" path <---*/
app.use("/auth", authRoutes);

/*---> Mounting the routes on the "/api" path <---*/
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", orderRoutes);
app.use("/api", clientRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error.stack); // Display the error in the console
    res.status(500).json({
        message: 'An error occurred on the server!',
        error: error.message
    })
})
dotenv.config();

mongoose.connect(process.env.MONGO_URL ?? '')
    .then(() => {
        const port = process.env.PORT
        app.listen(port ?? 3000, () => console.log("hello world!"))
    }).catch((error) => console.error("Error connecting to the database:", error))