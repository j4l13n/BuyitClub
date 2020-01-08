import express from "express";
import businessController from "../controllers/businesses";
import auth from "../middlewares/auth";
import businessMiddleware from "../middlewares/businesses";

const router = express.Router();

router.use('/', auth.checkAuthentication);

router.post('/business', businessMiddleware.create, businessController.createBusiness);
router.post('/category', businessController.createCategory);
router.post('/business/category', businessController.addBusinessCategory);
router.post('/business/payment', businessController.addPaymentMethod);

export default router;