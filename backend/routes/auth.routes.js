import express from "express"
import { login, paymentRazorpay, signUp, userCredits, verifyRazorpay } from "../controllers/user.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/signup",signUp);

router.post("/login",login);

router.get("/credits",protectRoute,userCredits);

router.post("/payrazorpay",protectRoute,paymentRazorpay)

router.post("/verifyrazorpay",protectRoute,verifyRazorpay)

export default router;