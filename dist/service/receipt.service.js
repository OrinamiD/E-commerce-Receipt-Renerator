import { uploadReceipt } from "../config/cloudinary.config.js";
import { sendReceiptEmail } from "../email/emailNotification.email.js";
import Order from "../model/order.model.js";
import Receipt from "../model/receipt.model.js";
("../model/receipt.model.js");
import { receiptGenerate } from "../utils/receipt.generation.js";
import { generateReceiptPDF } from "./pdf.service.js";
export const processReceipt = async (receiptData, orderId) => {
    const existingOrder = await Order.findOne({ orderId });
    if (!existingOrder) {
        throw new Error("Order does not exist");
    }
    const findReceipt = await Receipt.findOne({ receipt: receiptData.receiptId });
    if (findReceipt)
        throw new Error("receipt already exist");
    const receiptRef = await receiptGenerate();
    receiptData.receiptId = receiptRef;
    let retryCount = 0;
    const pdfPath = await generateReceiptPDF(receiptData);
    const uploadedUrl = await uploadReceipt(pdfPath);
    await sendReceiptEmail(receiptData.customerName, receiptData.customerEmail, pdfPath);
    const savedReceipt = new Receipt({
        receiptId: receiptRef,
        orderId,
        generatedAt: Date.now(),
        pdfUrl: uploadedUrl,
        emailSent: true,
        emailSentAt: Date.now(),
        status: "generated",
        retryCount,
    });
    await savedReceipt.save();
};
