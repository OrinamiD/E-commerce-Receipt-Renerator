import mongoose, { Document, Types } from "mongoose";
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
declare const Order: mongoose.Model<IOrder, {}, {}, {}, mongoose.Document<unknown, {}, IOrder, {}, mongoose.DefaultSchemaOptions> & IOrder & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IOrder>;
export default Order;
//# sourceMappingURL=order.model.d.ts.map