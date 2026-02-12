import { debounce } from "./debounce.js";
import { createRateLimiter } from "./rateLimiter.js";
import { Cache } from "./cache.js";

export function createSearchClient({
  debounceMs,
  maxCalls,
  interval,
  cacheTtl,
}) {
  const limiter = createRateLimiter({
    max: maxCalls,
    interval
  });

  const cache = new Cache(cacheTtl);

  const execute = async (request) => {
    // 1️⃣ Cache first (fastest path)
    const cached = cache.get(queryParam);
    if (cached !== undefined) {
      return cached;
    }

    // 2️⃣ Fail fast on rate limit
    if (!limiter.acquire()) {
      throw new Error("Rate limit exceeded");
    }

    // 3️⃣ Network call
    const result = await request();
    console.log("Fetched from network:", result);
    // 4️⃣ Store in cache
    cache.set(query, result);

    return result;
  };

  // 5️⃣ Debounced public API
  return debounce(execute, debounceMs);
}
