import express from 'express';
import userController from '../controllers/users';
import userMiddleware from '../middlewares/users';

const router = express.Router()

router.post('/register', userMiddleware.register, userController.register);
router.post('/role', userMiddleware.addRole, userController.addRole);
router.get('/role', userController.getRole);

export default router;