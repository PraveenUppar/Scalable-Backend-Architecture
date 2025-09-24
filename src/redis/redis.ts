import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisConfig = {
  host: process.env.REDIS_HOST as string,
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
  password: process.env.REDIS_PASSWORD as string,
  retryStrategy(times: number) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
};

const redis = new Redis(redisConfig);

redis.on("connect", () => {
  console.log(
    `Successfully connected to Redis at ${redisConfig.host}:${redisConfig.port}`
  );
});

redis.on("error", (err: Error) => {
  if (err.message.includes("NOAUTH")) {
    console.error(
      "Could not connect to Redis: Authentication error. Please check your REDIS_PASSWORD in the .env file."
    );
  } else {
    console.error("Could not connect to Redis.", err);
  }
});

export default redis;
