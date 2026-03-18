const redis = require('redis');
const RateLimit = require('ratelimit');

const redisClient = redis.createClient({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
});
const rateLimit = new RateLimit({
    redis: redisClient,
    points: 10,
    duration: 60
});

redisClient.connect();

module.exports = {redisClient, rateLimit};
