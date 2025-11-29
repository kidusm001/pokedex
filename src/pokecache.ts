export type CacheEntry<T> = {
  createdAt: number;
  val: T;
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalID: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, value: T) {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val: value
    });
  }

  get<T>(key: string): T | undefined {
    const cachedEntry = this.#cache.get(key);
    if (!cachedEntry) return undefined;
    if (cachedEntry.createdAt < Date.now() - this.#interval) {
      this.#cache.delete(key);
      return undefined;
    }
    return cachedEntry?.val;
  }

  #reap() {
    for (const entry of this.#cache) {
      if (entry[1].createdAt < Date.now() - this.#interval) {
        this.#cache.delete(entry[0]);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalID = setInterval(() => this.#reap, this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalID);
    this.#reapIntervalID = undefined;
  }
}
