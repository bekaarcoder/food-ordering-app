import { NextFunction, Request, Response } from 'express';
import Restaurant from '../models/restaurant';
import createHttpError from 'http-errors';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';

export const getMyRestaurant = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const existingRestaurant = await Restaurant.findOne({
            user: req.userId,
        });
        if (!existingRestaurant)
            throw createHttpError(404, 'Restaurant not found');

        res.status(200).json(existingRestaurant);
    } catch (error) {
        next(error);
    }
};

export const createMyRestaurant = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const existingRestaurant = await Restaurant.findOne({
            user: req.userId,
        });
        if (existingRestaurant)
            throw createHttpError(409, 'User restaurant already exists');

        const image = req.file as Express.Multer.File;
        const base64Image = Buffer.from(image.buffer).toString('base64');
        const dataURI = `data:${image.mimetype};base64,${base64Image}`;

        const uploadResponse = await cloudinary.uploader.upload(dataURI);

        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = uploadResponse.url;
        restaurant.user = new mongoose.Types.ObjectId(req.userId);
        await restaurant.save();

        res.status(201).json(restaurant);
    } catch (error) {
        next(error);
    }
};
