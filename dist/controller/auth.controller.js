import { login, otpVerification, Registration, } from "../service/auth.service.js";
export const signup = async (req, res) => {
    try {
        const { user } = await Registration(req.body);
        return res.status(201).json({
            success: true,
            message: "registrarion successful, check your email for otp",
            user: {
                name: user.customerName,
                email: user.customerEmail,
                otp: user.otp,
                role: user.role,
            },
        });
    }
    catch (error) {
        if (error.message === "User already exist")
            return res.status(404).json({ success: false, message: error.message });
        else {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};
export const verfiyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const verified = await otpVerification(otp);
        return res
            .status(200)
            .json({ success: true, message: "otp verified successfully" });
    }
    catch (error) {
        if (error.message === "Incorrect Otp") {
            return res.status(400).json({ success: false, message: error.message });
        }
        if (error.message === "Account already verified") {
            return res.status(400).json({ success: false, message: error.message });
        }
        if (error.message === "Forbidden") {
            return res.status(400).json({ success: false, message: error.message });
        }
        if (error.message === "Otp expired") {
            return res.status(400).json({ success: false, message: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};
export const resendOtp = async (req, res) => { };
export const signin = async (req, res) => {
    try {
        const { user, access, refresh } = await login(req.body);
        return res
            .cookie("refresh", refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 1000, // 7 days
        })
            .status(200)
            .json({
            sucess: true,
            message: "login successfully",
            data: {
                name: user.customerName,
                email: user.customerEmail,
                id: user?.id,
                role: user.role,
            },
            access,
        });
    }
    catch (error) {
        if (error.message === "User does not exist") {
            return res.status(404).json({ success: false, message: error.message });
        }
        if (error.message === "check your email to verify your account") {
            return res.status(404).json({ success: false, message: error.message });
        }
        if (error.message === "Incorrect email or password") {
            return res.status(400).json({ success: false, message: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: error.message });
            // console.log("Cant login");
        }
    }
};
//# sourceMappingURL=auth.controller.js.map