import type { RedisOptions } from "bullmq";
export const RedisConnection: RedisOptions = {
  host: process.env.REDIS_HOST!,
  port: Number(process.env.REDIS_PORT)
};

