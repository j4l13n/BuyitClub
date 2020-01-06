import express from "express";
import businessController from "../controllers/businesses";

const router = express.Router();

router.post('/business', businessController.createBusiness);

export default router;