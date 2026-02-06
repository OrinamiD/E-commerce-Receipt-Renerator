import { type NextFunction, type Request, type Response } from "express";
export declare const validateRegistration: (req: Request<{
    customerName: string;
    customerEmail: string;
    password: string;
}>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
interface AuthUser extends Request {
    user?: any;
}
export declare const auth: (req: AuthUser, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
interface AuthRequest extends Request {
    role?: any;
}
export declare const isStoreOwner: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const validateLogin: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const validateOTP: (req: Request<{
    otp: string;
}>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=auth.middleware.d.ts.map