import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import myUserRoute from './routes/MyUserRoutes';
import myRestaurantRoute from './routes/MyRestaurantRoutes';
import myTestRoute from './routes/TestRoute';
import createHttpError, { isHttpError } from 'http-errors';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/my/user', myUserRoute);
app.use('/api/my/restaurant', myRestaurantRoute);
app.use('/api/my/test', myTestRoute);

app.use((req, res, next) => {
    next(createHttpError(404, 'Endpoint not found'));
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    let errMessage = 'An unknow error occurred';
    let statusCode = 500;
    if (isHttpError(err)) {
        errMessage = err.message;
        statusCode = err.statusCode;
    }
    res.status(statusCode).json({ error: errMessage });
});

mongoose
    .connect(process.env.MONGO_CONNECTION_URI as string)
    .then(() => {
        console.log('Connected to database');
        app.listen(7001, () => {
            console.log('Server running on localhost:7001');
        });
    })
    .catch((error) => {
        console.log(error);
    });
