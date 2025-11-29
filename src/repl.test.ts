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
