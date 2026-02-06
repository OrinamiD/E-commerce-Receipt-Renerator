import { Queue } from "bullmq";
import { RedisConnection } from "../config/redis.config.js";
export const recieptQueue = new Queue("receipt-generation", {
    connection: RedisConnection,
});
//# sourceMappingURL=receipt.queue.js.map