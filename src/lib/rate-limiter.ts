import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

type Unit = 'ms' | 's' | 'm' | 'h' | 'd';
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

const NUM_REQUESTS = Number(process.env.RATELIMIT_REQUESTS as string);
const TIME = process.env.RATELIMIT_TIME as Duration;

export const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(NUM_REQUESTS, TIME),
});
