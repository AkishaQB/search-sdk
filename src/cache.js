export class Cache {
  constructor(ttlMs) {
    this.ttlMs = ttlMs;
    this.store = new Map();
  }

  set(key, value) {
    const expiresAt = Date.now() + this.ttlMs;

    this.store.set(key, {
      value,
      expiresAt
    });
  }

  get(key) {
    const entry = this.store.get(key);

    if (!entry) return undefined;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }

    return entry.value;
  }
}
