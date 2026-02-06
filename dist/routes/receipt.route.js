import express, { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import { generateReceipt } from "../controller/checkout.controller.js";
const router = express.Router();
router.post("/confirm-payment", auth, generateReceipt);
export default router;
//# sourceMappingURL=receipt.route.js.map