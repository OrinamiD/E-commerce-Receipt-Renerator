import mongoose, { Document, Types } from "mongoose";
export interface IReceipt extends Document {
    receiptId: string;
    orderId: Types.ObjectId;
    generatedAt: Date;
    pdfUrl: string;
    emailSent: boolean;
    emailSentAt: Date;
    status: string;
    retryCount: number;
}
declare const Receipt: mongoose.Model<IReceipt, {}, {}, {}, mongoose.Document<unknown, {}, IReceipt, {}, mongoose.DefaultSchemaOptions> & IReceipt & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IReceipt>;
export default Receipt;
//# sourceMappingURL=receipt.model.d.ts.map