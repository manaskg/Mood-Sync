const Redis = require("ioredis").default;

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("server is connected to redis");
});

redis.on("error", (error) => {
  console.error("Redis connection error:", error.message);
});

module.exports = redis;
