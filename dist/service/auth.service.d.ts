import type { IUser } from "../model/user.model.js";
export declare const Registration: (data: IUser) => Promise<{
    user: import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    };
    message: string;
}>;
export declare const otpVerification: (otp: string) => Promise<{
    realOtp: import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    };
}>;
export declare const reSendingOtp: (email: string) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | undefined>;
interface Login {
    customerEmail: string;
    password: string;
}
export declare const login: (data: Login) => Promise<{
    user: import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    };
    access: string;
    refresh: string;
}>;
export {};
//# sourceMappingURL=auth.service.d.ts.map