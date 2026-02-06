import { type IOrder } from "../model/order.model.js";
export declare const newOrders: (data: IOrder) => Promise<{
    order: import("mongoose").Document<unknown, {}, IOrder, {}, import("mongoose").DefaultSchemaOptions> & IOrder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    };
    user: import("mongoose").Document<unknown, {}, import("../model/user.model.js").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../model/user.model.js").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    };
}>;
export declare const getOrder: (orderId: string, userId: string) => Promise<{
    order: import("mongoose").Document<unknown, {}, IOrder, {}, import("mongoose").DefaultSchemaOptions> & IOrder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    };
    user: import("mongoose").Document<unknown, {}, import("../model/user.model.js").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../model/user.model.js").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    };
}>;
export declare const allOrder: () => Promise<{
    order: (import("mongoose").Document<unknown, {}, import("../model/receipt.model.js").IReceipt, {}, import("mongoose").DefaultSchemaOptions> & import("../model/receipt.model.js").IReceipt & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[];
}>;
//# sourceMappingURL=order.service.d.ts.map