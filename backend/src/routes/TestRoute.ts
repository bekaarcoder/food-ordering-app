import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    console.log('Request Body: ', req.body);
    res.sendStatus(201);
});

export default router;
