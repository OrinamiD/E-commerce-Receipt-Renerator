import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    items: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            unitPrice: { type: Number, required: true },
            subtotal: { type: Number, required: true },
        },
    ],
    subtotal: {
        type: Number,
    },
    tax: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    totalAmount: {
        type: Number,
    },
    paymentMethod: {
        type: String,
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    storeDetails: {
        names: String,
        address: String,
        phone: String,
        email: String,
        // taxId: String,
    },
}, { timestamps: true });
const Order = mongoose.model("Order", orderSchema);
export default Order;
