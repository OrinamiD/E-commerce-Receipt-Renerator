import Order from "../model/order.model.js";
import User from "../model/user.model.js";
import { recieptQueue } from "../queue/receipt.queue.js";

export interface IPayment extends Request {
  orderId: string;
  userId: string;
}
export const confirmPayment = async (data: IPayment) => {
  const { orderId, userId } = data;
  
  const user = await User.findById(userId);

  if (!user) throw new Error("user does not exist");

  const exisitingOrder = await Order.findOne({ orderId });

  if (!exisitingOrder) {
    throw new Error("order does not exist");
  }

  if (exisitingOrder.paymentStatus === "completed")
    throw new Error("Receipt already generated");
  if (exisitingOrder.paymentStatus === "failed")
    throw new Error("You can not ger receipt");
  // const queued = await recieptQueue.add("receipt-queue", {
  //   data: {
  //     orderId: newOrder?.orderId,
  //   },
  //   info: {
  //     jobId: newOrder.orderId,
  //   },
  // });

  const queued = await recieptQueue.add("receipt-queue", {
    orderId: exisitingOrder?.orderId,
    userId: user?._id,
    // customerName: user.customerName,
    // customerEmail: user.customerEmail,
  });

  // if (!queued) throw new Error("Error sending order");

  return {
    queue: queued,
    orderItem: exisitingOrder,
  };
};
