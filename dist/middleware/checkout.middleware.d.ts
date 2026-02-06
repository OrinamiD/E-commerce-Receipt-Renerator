import type { NextFunction, Request, Response } from "express";
export declare const validateCheckoutPayment: (req: Request<{
    paymentStatus: string;
}>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=checkout.middleware.d.ts.map