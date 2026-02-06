import express, { Router } from "express";
import { resendOtp, signin, signup, verfiyOtp, } from "../controller/auth.controller.js";
import { validateLogin, validateRegistration, } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/sign-up", validateRegistration, signup);
router.post("/verify-otp", verfiyOtp);
router.post("/resend-oto", resendOtp);
router.post("/sign-in", validateLogin, signin);
export default router;
// validateOTP,
//# sourceMappingURL=auth.route.js.map