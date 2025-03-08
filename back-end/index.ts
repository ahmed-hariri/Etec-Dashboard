import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import { authRoutes } from "./routes/authentication";
import { productRoutes } from './routes/product';
import { categoryRoutes } from './routes/categorys/index';
import { orderRoutes } from './routes/orders';
import { clientRoutes } from './routes/clients';
import { contactRoute } from './routes/contacts';
import { purchesedRoutes } from './routes/purchesed';

const app: express.Application = express();
app.use(express.json());
app.use(cors());
dotenv.config();

/*---> Mounting the authentication routes on the "/auth" path <---*/
app.use("/auth", authRoutes);

/*---> Mounting the routes on the "/api" path <---*/
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", orderRoutes);
app.use("/api", clientRoutes);
app.use("/api", contactRoute);
app.use("/api", purchesedRoutes);

app.use((error: Error, req: Request, res: Response) => {
    console.error(error.stack); // Display the error in the console
    res.status(500).json({
        message: 'An error occurred on the server!',
        error: error.message
    })
})

mongoose.connect(process.env.MONGO_URL ?? '')
    .then(() => {
        const port = process.env.PORT
        app.listen(port ?? 3000, () => console.log("hello world!"))
    }).catch((error) => console.error("Error connecting to the database:", error))