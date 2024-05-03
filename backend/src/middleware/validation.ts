import { NextFunction, Request, Response } from 'express';
import { body, check, validationResult } from 'express-validator';
import createHttpError from 'http-errors';

export const validateMyUserRequest = [
    body('name').isString().notEmpty().withMessage('Name must be a string'),
    body('addressLine1')
        .isString()
        .notEmpty()
        .withMessage('Address Line 1 must be a string'),
    body('city').isString().notEmpty().withMessage('City must be a string'),
    body('country')
        .isString()
        .notEmpty()
        .withMessage('Country must be a string'),
];

export const validateMyRestaurantRequest = [
    body('name').trim().notEmpty().withMessage('Name must be a string'),
    body('city').trim().notEmpty().withMessage('City must be a string'),
    body('country').trim().notEmpty().withMessage('Country must be a string'),
    body('deliveryPrice')
        .isFloat({ min: 0 })
        .withMessage('Delivery price must be a positive number'),
    body('estimatedDeliveryTime')
        .isInt({ min: 0 })
        .withMessage('Estimated Delivery Time must be a positive integer'),
    body('cuisines')
        .isArray()
        .withMessage('Cuisines must be an array')
        .not()
        .isEmpty()
        .withMessage('Cusinies array cannot be empty'),
    body('menuItems').isArray().withMessage('Menu items must be an array'),
    body('menuItems.*.name')
        .notEmpty()
        .withMessage('Menu item name is required'),
    body('menuItems.*.price')
        .isFloat({ min: 0 })
        .withMessage(
            'Menu item price is required and must be a positive number'
        ),
    body('imageFile').custom((_, { req }) => {
        if (!req.file) throw new Error('Image file is required');
        return true;
    }),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
    console.log('Request Body:', req.body);
    const error = validationResult(req).array();
    if (error.length) {
        console.error(error);
        console.log(error[0].msg);
        throw createHttpError(400, error[0].msg);
    }
    next();
};
