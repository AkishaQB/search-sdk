
/** Token Bucket mental model 
Imagine a bucket:

Capacity = max
Tokens refill over time
Each request consumes 1 token
No token → reject */


export function createRateLimiter({ max, interval }) {
  let tokens = max;
  let lastRefill = Date.now();

  const refillRate = max / interval; // tokens per ms

  return {
    acquire() {
      const now = Date.now();
      const elapsed = now - lastRefill;

      // Refill tokens based on time passed
      tokens = Math.min(max, tokens + elapsed * refillRate);
      lastRefill = now;

      if (tokens >= 1) {
        tokens -= 1;
        return true;
      }

      return false;
    }
  };
}
