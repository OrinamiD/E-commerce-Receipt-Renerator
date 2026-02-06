import mongoose, { Schema, Document, Types } from "mongoose";
const receiptSchema = new mongoose.Schema({
    receiptId: {
        type: String,
        unique: true,
        required: true,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    },
    generatedAt: {
        type: Date,
        default: Date.now,
    },
    pdfUrl: {
        type: String,
    },
    // cloudinaryPublicId: String,
    emailSent: {
        type: Boolean,
        default: false,
    },
    emailSentAt: {
        type: Date,
    },
    status: {
        type: String,
        enum: ["pending", "generated", "uploaded", "emailed", "failed"],
        default: "pending",
    },
    retryCount: {
        type: Number,
        default: 0,
    },
    // errorLog: [{ timestamp: Date, error: String }],
}, { timestamps: true });
const Receipt = mongoose.model("Receipt", receiptSchema);
export default Receipt;
//# sourceMappingURL=receipt.model.js.map