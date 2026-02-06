import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { expiresAt, generateOtp, passwordHashed, } from "../utils/password.hash.js";
export const Registration = async (data) => {
    const user = await User.findOne({
        customerEmail: data.customerEmail.toLowerCase(),
    });
    if (user) {
        throw new Error("User already exist");
    }
    const hashPassword = await passwordHashed(data.password);
    const code = await generateOtp();
    const newUser = new User({
        ...data,
        password: hashPassword,
        otp: code,
        otpExpiresAt: await expiresAt(),
    });
    await newUser.save();
    console.log(newUser);
    newUser.password = undefined;
    return {
        user: newUser,
        message: "Email sent successfully",
    };
};
export const otpVerification = async (otp) => {
    const realOtp = await User.findOne({ otp: otp });
    if (!realOtp) {
        throw new Error("Incorrect Otp");
    }
    if (realOtp.isComplete) {
        throw new Error("Account already verified");
    }
    if (realOtp.otp != otp) {
        throw new Error("Forbidden");
    }
    if (realOtp.otpExpiresAt < new Date()) {
        throw new Error("Otp expired");
    }
    realOtp.isComplete = true;
    await realOtp.save();
    return {
        realOtp,
    };
};
export const reSendingOtp = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("user does not exist");
        }
        // const isAlreadyVerified =
        if (user.isComplete === true) {
            throw new Error("Your account is already verified");
        }
        if (user.otpExpiresAt > new Date(Date.now())) {
            throw new Error("Check your email for your previous otp");
        }
        const newOTP = await generateOtp();
        user.otp = newOTP;
        user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();
        return user;
    }
    catch (error) { }
};
export const login = async (data) => {
    const { customerEmail, password } = data;
    const user = await User.findOne({ customerEmail });
    if (!user) {
        throw new Error("User does not exist");
    }
    if (user.isComplete === false) {
        throw new Error("check your email to verify your account");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Incorrect email or password");
    }
    const accessToken = jwt.sign({ customerEmail: user.customerEmail, role: user.role, id: user?._id }, `${process.env.ACCESS_TOKEN}`, { expiresIn: "5m" });
    const refreshToken = jwt.sign({ customerEmail: user.customerEmail, role: user.role, id: user?._id }, `${process.env.ACCESS_TOKEN}`, { expiresIn: "5m" });
    user.password = undefined;
    return {
        user: user,
        access: accessToken,
        refresh: refreshToken,
    };
};
//# sourceMappingURL=auth.service.js.map