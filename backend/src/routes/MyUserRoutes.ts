import express from 'express';
import {
    createCurrentUser,
    getCurrentUser,
    updateCurrentUser,
} from '../controllers/MyUserController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validate, validateMyUserRequest } from '../middleware/validation';

const router = express.Router();

router.get('/', jwtCheck, jwtParse, getCurrentUser);

router.post('/', jwtCheck, createCurrentUser);

router.put(
    '/',
    jwtCheck,
    jwtParse,
    validateMyUserRequest,
    validate,
    updateCurrentUser
);

export default router;
