import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    customerName: string;
    customerEmail: string;
    password: string;
    otp: string;
    otpExpiresAt: Date;
    isComplete: boolean;
    role: string;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default User;
//# sourceMappingURL=user.model.d.ts.map