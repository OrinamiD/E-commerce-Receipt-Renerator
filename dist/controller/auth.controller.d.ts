import type { Request, Response } from "express";
export declare const signup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verfiyOtp: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const resendOtp: (req: Request, res: Response) => Promise<void>;
export declare const signin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.controller.d.ts.map