import jwt, {} from "jsonwebtoken";
import {} from "express";
import joi from "joi";
import User from "../model/user.model.js";
export const validateRegistration = async (req, res, next) => {
    const errors = [];
    const { customerName, customerEmail, password } = req.body;
    if (!customerName)
        errors.push("name is required");
    if (!customerEmail)
        errors.push("name is required");
    if (!password)
        errors.push("password is required");
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
export const auth = async (req, res, next) => {
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
        const decoded = jwt.verify(realToken, process.env.ACCESS_TOKEN);
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
    }
    catch (error) {
        console.log("User details is not correct", error);
    }
};
export const isStoreOwner = async (req, res, next) => {
    const { role } = req.body;
    if (req.role === "E-CommerceBusiness" || role === "E-CommerceBusiness") {
        next();
    }
    else {
        return res
            .status(403)
            .json({ success: false, message: "You are not allowed" });
    }
};
export const validateLogin = async (req, res, next) => {
    const { customerEmail, password } = req.body;
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
export const validateOTP = async (req, res, next) => {
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
//# sourceMappingURL=auth.middleware.js.map