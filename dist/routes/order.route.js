import express, { Router } from "express";
import { craeteOrder } from "../controller/order.controller.js";
import { auth } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/create-order", auth, craeteOrder);
export default router;
//# sourceMappingURL=order.route.js.map