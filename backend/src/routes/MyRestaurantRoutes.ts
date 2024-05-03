import express from 'express';
import {
    createMyRestaurant,
    getMyRestaurant,
} from '../controllers/MyRestaurantController';
import {
    validate,
    validateMyRestaurantRequest,
} from './../middleware/validation';
import { upload } from '../middleware/upload';
import { jwtCheck, jwtParse } from '../middleware/auth';

const router = express.Router();

router.get('/', jwtCheck, jwtParse, getMyRestaurant);

router.post(
    '/',
    jwtCheck,
    jwtParse,
    upload.single('imageFile'),
    validateMyRestaurantRequest,
    validate,
    createMyRestaurant
);

export default router;
