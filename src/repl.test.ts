import { cleanInput } from "./repl";
import { Cache } from "./pokecache";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "   Hello world  ",
    expected: ["hello", "world"],
  },
  {
    input: "   TorpA PANT  ",
    expected: ["torpa", "pant"],
  },
  {
    input: "   Hello world from kidus  ",
    expected: ["hello", "world", "from", "kidus"],
  },
  {
    input: "   Hello world  But    wide",
    expected: ["hello", "world", "but", "wide"],
  },
  {
    input: "",
    expected: [],
  },
  {
    input: "   ",
    expected: [],
  },
  {
    input: "PIKACHU",
    expected: ["pikachu"],
  },
  {
    input: "hello   \n world",
    expected: ["hello", "world"],
  },
  {
    input: "\tHello\tworld\n",
    expected: ["hello", "world"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);

    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
  test("lowercases all words", () => {
    const actual = cleanInput("HeLLo WoRLD");
    expect(actual).toEqual(["hello", "world"]);
  });
});

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval + 100));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});

test.concurrent.each([
  {
    senario: "concurrent-shared-keys",
    key: "shard-key",
    val: "value",
    interval: 200,
  },
  {
    senario: "concurrent-unique-keys",
    key: "unique-key",
    val: "value",
    interval: 300,
  }
])("Testing Caching $senario", async ({ key, val, interval }) => {
  const cache = new Cache(interval);
  const promises = Array.from({ length: 5 }, (_, i) => {
    new Promise<void>((resolve) => {
      setTimeout(() => {
        cache.add(`${key}-${i}`, `${val}-${i}`);
        const retrived = cache.get(`${key}-${i}`);
        expect(retrived).toBe(`${val}-${i}`);
        resolve();
      }, Math.random() * 50);
    });
  });
  await Promise.all(promises);
  cache.stopReapLoop();
});

test.concurrent.each([
  {
    senario: "overwrite-existing",
    key: "overwrite-test",
    val1: "overwrite-value-1",
    val2: "overwrite-value-2",
    interval: 200,
  },
  {
    senario: "overwrite-url",
    key: "https://lol.chat",
    val1: "response-1",
    val2: "response-2",
    interval: 200,
  },
])("Testing Cacheing $senario", async ({ key, val1, val2, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val1);
  expect(cache.get(key)).toBe(val1);

  cache.add(key, val2);
  expect(cache.get(key)).toBe(val2);

  cache.stopReapLoop();
});

test.concurrent.each([
  {
    senario: "Empty-string",
    key: "empty-key",
    val: "",
    interval: 200,
  },
  {
    senario: "Null-string",
    key: "null-key",
    val: null,
    interval: 200,
  },
  {
    senario: "Zero-string",
    key: "zero-key",
    val: 0,
    interval: 300,
  },
])(`Test edge cases $senario`, async ({ key, val, interval }) => {
  const cache = new Cache(interval);
  cache.add(key, val);
  const retrived = cache.get(key);
  expect(retrived).toBe(val);
});
