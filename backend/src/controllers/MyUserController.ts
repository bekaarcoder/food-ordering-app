import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import createHttpError from 'http-errors';

export const createCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { auth0Id } = req.body;

        const existingUser = await User.findOne({ auth0Id });
        if (existingUser) throw createHttpError(400, 'User already exists');

        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json(newUser.toObject());
    } catch (error) {
        next(error);
    }
};

export const updateCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = await User.findById(req.userId);

        if (!user) throw createHttpError(404, 'User not found');

        user.name = name;
        user.addressLine1 = addressLine1;
        user.country = country;
        user.city = city;

        await user.save();

        res.send(user);
    } catch (error) {
        next(error);
    }
};

export const getCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) throw createHttpError(404, 'User not found');

        res.json(user);
    } catch (error) {
        next(error);
    }
};
