import mongoose, { Schema, Document, Types } from "mongoose";

export interface IReceipt extends Document {
  receiptId: string;
  orderId: Types.ObjectId;
  generatedAt: Date;
  pdfUrl: string;
  emailSent: boolean;
  emailSentAt: Date;
  status: string;
  retryCount: number;
  // errorLog:
}

const receiptSchema: Schema<IReceipt> = new mongoose.Schema(
  {
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
  },
  { timestamps: true },
);

const Receipt = mongoose.model<IReceipt>("Receipt", receiptSchema);

export default Receipt;
