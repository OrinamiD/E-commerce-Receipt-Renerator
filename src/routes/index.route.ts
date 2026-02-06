import express, { Router } from "express";

const router: Router = express.Router();

import authRoute from "./auth.route.js";

import receiptRoute from "./receipt.route.js";

import orderRoute from "./order.route.js";

router.use("/auth", authRoute);
router.use("/checkout", receiptRoute);
router.use("/order", orderRoute);

export default router;
