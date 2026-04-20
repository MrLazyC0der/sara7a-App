import { redisClient } from "./redis.connection.js";

export const revokeTokenKryPrefix = ({userId})=>{
    return `user:revokeToken:${userId}`;
}
export const revokeTokenKey = ({userId , jti})=>{
    return `${revokeTokenKryPrefix({userId})}:${jti}`;
}
/**
 * SET
 */
export const set = async ({ key, value, ttl = null }) => {
    try {
        const data = typeof value !== "string" ? JSON.stringify(value) : value;

        const options = {};
        if (ttl) options.EX = ttl;

        await redisClient.set(key, data, options);
        return true;

    } catch (error) {
        console.error("Redis Set Error:", error);
        throw error;
    }
};


/**
 * GET
 */
export const get = async ({ key }) => {
    try {
        const data = await redisClient.get(key);
        if (!data) return null;

        try {
            return JSON.parse(data);
        } catch {
            return data; // string عادي
        }

    } catch (error) {
        console.error("Redis Get Error:", error);
        throw error;
    }
};


/**
 * UPDATE (only if exists)
 */
export const update = async ({ key, value, ttl = null }) => {
    try {
        const data = typeof value !== "string" ? JSON.stringify(value) : value;

        const options = { XX: true }; // update only
        if (ttl) options.EX = ttl;

        const result = await redisClient.set(key, data, options);

        return result === "OK"; // true / false

    } catch (error) {
        console.error("Redis Update Error:", error);
        throw error;
    }
};


/**
 * DELETE
 */
export const del = async ({ key }) => {
    try {
        const result = await redisClient.del(key);
        return result === 1;

    } catch (error) {
        console.error("Redis Delete Error:", error);
        throw error;
    }
};


/**
 * EXPIRE
 */
export const expire = async ({ key, ttl }) => {
    try {
        if (!ttl) return false;

        const result = await redisClient.expire(key, ttl);
        return result === 1;

    } catch (error) {
        console.error("Redis Expire Error:", error);
        throw error;
    }
};


/**
 * TTL
 */
export const ttl = async ({ key }) => {
    try {
        return await redisClient.ttl(key);

    } catch (error) {
        console.error("Redis TTL Error:", error);
        throw error;
    }
};


/**
 * KEYS (safe using SCAN)
 */
export const keys = async ({ pattern = "*" }) => {
    try {
        const result = [];

        for await (const key of redisClient.scanIterator({
            MATCH: pattern
        })) {
            result.push(key);
        }

        return result;

    } catch (error) {
        console.error("Redis Keys Error:", error);
        throw error;
    }
};