import { Redis } from "ioredis";
const redis = new Redis();
redis.on("connect", () => {
    console.log("Successfully connected to Redis!");
});
redis.on("error", (err) => {
    console.error("Could not connect to Redis.", err);
});
export default redis;
//# sourceMappingURL=redis.js.map