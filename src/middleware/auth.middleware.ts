import jwt, { type JwtPayload } from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";
import joi from "joi";
import User from "../model/user.model.js";

export const validateRegistration = async (
  req: Request<{
    customerName: string;
    customerEmail: string;
    password: string;
  }>,
  res: Response,
  next: NextFunction,
) => {
  const errors = [];

  const { customerName, customerEmail, password } = req.body;

  if (!customerName) errors.push("name is required");
  if (!customerEmail) errors.push("name is required");
  if (!password) errors.push("password is required");

  if (errors.length > 0) {
    return res.status(401).json({ success: false, message: errors });
  }

  const userValidate = joi.object({
    customerName: joi.string().required().min(3),
    customerEmail: joi.string().required().min(7),
    password: joi.string().required().min(6),
  });
  const { error } = userValidate.validate({
    customerName,
    customerEmail,
    password,
  });

  if (error)
    return res.status(403).json({ success: false, message: "Invalid details" });

  next();
};

interface AuthUser extends Request {
  user?: any;
}

export const auth = async (
  req: AuthUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header("authorization");

    if (!token)
      return res.status(403).json({ success: false, message: "Forbidden" });

    const splitedToken = token.split(" ");

    const realToken = splitedToken[1];

    if (!realToken)
      return res
        .status(403)
        .json({ success: false, message: "Incorrect prompt" });

    const decoded = jwt.verify(
      realToken,
      process.env.ACCESS_TOKEN as string,
    ) as JwtPayload;

    if (!decoded)
      return res
        .status(403)
        .json({ success: false, message: "Incorrect details" });

    const user = await User.findById(decoded?.id);

    if (!user)
      return res
        .status(403)
        .json({ success: false, message: "user not found" });

    req.user = user;
    next();
  } catch (error: any) {
    console.log("User details is not correct", error);
  }
};

// is store owner

interface AuthRequest extends Request {
  role?: any;
}

export const isStoreOwner = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { role } = req.body;

  if (req.role === "E-CommerceBusiness" || role === "E-CommerceBusiness") {
    next();
  } else {
    return res
      .status(403)
      .json({ success: false, message: "You are not allowed" });
  }
};

export const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { customerEmail, password } = req.body as {
    customerEmail: string;
    password: string;
  };
  const errors = [];

  if (!customerEmail) {
    errors.push("Email is required");
  }
  if (!password) {
    errors.push("Password is required");
  }
  if (errors.length > 0) {
    return res.status(200).json({ success: false, message: errors });
  }

  next();
};

export const validateOTP = async (
  req: Request<{ otp: string }>,
  res: Response,
  next: NextFunction,
) => {
  const errors = [];

  const { otp } = req.body;

  if (!otp) {
    errors.push("Otp is required");
  }

  if (errors.length > 0) {
    return res.status(200).json({ success: false, message: errors });
  }
  next();
};
