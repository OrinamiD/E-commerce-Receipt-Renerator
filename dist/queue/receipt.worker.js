import { Worker } from "bullmq";
import { RedisConnection } from "../config/redis.config.js";
import { logger } from "../utils/logger.utils.js";
import Order from "../model/order.model.js";
import User from "../model/user.model.js";
import { processReceipt } from "../service/receipt.service.js";
new Worker("receipt-generation", async (job) => {
    const { orderId, userId } = job.data;
    const order = await Order.findOne({ orderId });
    const user = await User.findById(userId);
    if (!order || !user) {
        throw new Error("Invalid receipt data");
    }
    const receiptData = {
        receiptId: "",
        orderId: order.orderId,
        customerName: user.customerName,
        customerEmail: user.customerEmail,
        items: order.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
        })),
        subtotal: order.subtotal,
        tax: order.tax,
        total: order.totalAmount,
        paymentMethod: order.paymentMethod,
        orderDate: order.orderDate,
        storeDetails: {
            names: order.storeDetails.names,
            address: order.storeDetails.address,
            phone: order.storeDetails.phone,
            email: order.storeDetails.email,
        },
    };
    await processReceipt(receiptData, order.orderId);
}, {
    connection: RedisConnection,
}).on("failed", (job, err) => {
    logger.error(err.message);
});
//# sourceMappingURL=receipt.worker.js.map