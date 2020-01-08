import express from 'express';
import users from "./users";
import businesses from "./businesses";

const router = express.Router()

router.use('/api', users);
router.use('/api', businesses);

export default router;