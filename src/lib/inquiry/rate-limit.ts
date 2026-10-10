type Bucket = { hits: number[] };

const buckets = new Map<string, Bucket>();

export function resetRateLimits(): void {
  buckets.clear();
}

/** Returns true when the request is allowed. The key should already be a hash, not a raw address. */
export function allowInquiry(key: string, now: number, limit = 8, windowMs = 10 * 60 * 1000): boolean {
  const bucket = buckets.get(key) ?? { hits: [] };
  const recent = bucket.hits.filter((hit) => now - hit < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, { hits: recent });
    return false;
  }
  recent.push(now);
  buckets.set(key, { hits: recent });
  if (buckets.size > 1000) {
    const oldest = buckets.keys().next().value;
    if (oldest) buckets.delete(oldest);
  }
  return true;
}
