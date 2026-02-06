import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, "name is required"],
    },
    customerEmail: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: 6,
    },
    otp: {
        type: String,
    },
    otpExpiresAt: {
        type: Date,
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["customer", "E-CommerceBusiness"],
        default: "customer",
    },
}, { timestamps: true });
const User = mongoose.model("User", userSchema);
export default User;
