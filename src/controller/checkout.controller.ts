import type { Request, Response } from "express";

import { confirmPayment } from "../service/checkout.service.js";

// export const generateReceipt = async (req: Request, res: Response) => {
//   try {
//     const { orderId } = req.body;
//     await recieptQueue.add("receipt-queue", { orderId }, { jobId: orderId });

//     return res
//       .status(202)
//       .json({ success: true, message: "Receipt generation queued" });
//   } catch (error: any) {
//     console.log("Receipt generation failed", error);
//   }
// };

export const generateReceipt = async (req: Request, res: Response) => {
  try {
    const { orderId, userId } = req.body;

    const { queue, orderItem } = await confirmPayment(req.body);

    return res
      .status(200)
      .json({
        success: true,
        message: "Receipt genreation queued",
        orderItem,
        queue,
      });
  } catch (error: any) {
    if (error.message === "user does not exist") {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message === "order already exist") {
      return res.status(400).json({ success: false, message: error.message });
    }

    if (error.message === "You cant get Receipt") {
      return res.status(400).json({ success: false, message: error.message });
    }

    // if (error.message === "Error sending order") {
    //   return res.status(400).json({ success: false, message: error.message });
    // }
    else {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};
