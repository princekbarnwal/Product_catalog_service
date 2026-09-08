import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://redis:6379");

redis.on("connect", () => {
    console.log("Redis connected Successfully");
});

redis.on("error", (error) => {
    console.error("Redis error:", error);
});

export default redis;