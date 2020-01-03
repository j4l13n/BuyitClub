import express from 'express';
import userController from '../controllers/users';
import userMiddleware from '../middlewares/users';

const router = express.Router()

router.post('/register', userMiddleware.register, userController.register);

export default router;