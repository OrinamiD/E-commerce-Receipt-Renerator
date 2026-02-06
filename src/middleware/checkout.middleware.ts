import type { NextFunction, Request, Response } from "express";

export const validateCheckoutPayment = async (
  req: Request<{ paymentStatus: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { paymentStatus } = req.body;

  const errors = [];

  if (!paymentStatus) {
    errors.push("paymentStatus is required");
  }

  if (errors.length > 0) {
    return res.status(200).json({ success: true, message: errors });
  }

  next();
};
