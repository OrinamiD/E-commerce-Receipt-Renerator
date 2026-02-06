import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrder extends Document {
  orderId: string;
  customerId: Types.ObjectId;
  items: {
    name: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
  subtotal: number;
  tax: number;
  discount: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderDate: Date;
  storeDetails: {
    names: string;
    address: string;
    phone: string;
    email: string;
  };
}

const orderSchema: Schema<IOrder> = new mongoose.Schema(
  {
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
  },
  { timestamps: true },
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
