export interface IPayment extends Request {
    orderId: string;
    userId: string;
}
export declare const confirmPayment: (data: IPayment) => Promise<{
    queue: import("bullmq").Job<any, any, string>;
    orderItem: import("mongoose").Document<unknown, {}, import("../model/order.model.js").IOrder, {}, import("mongoose").DefaultSchemaOptions> & import("../model/order.model.js").IOrder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    };
}>;
//# sourceMappingURL=checkout.service.d.ts.map