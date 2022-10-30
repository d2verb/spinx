import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";
import { AsciiColor, decorate } from "./mod.ts";

Deno.test("decorate() does nothing if AsciiColor.None is given", () => {
  const text = "some text";
  const decorated = decorate(text, AsciiColor.None);
  assertEquals(decorated, text);
});

Deno.test("decorate() can colorize the given text", () => {
  const text = "some text";
  const decorated = decorate(text, AsciiColor.Red);
  const expected = `\x1b[31m${text}\x1b[0m`;
  assertEquals(decorated, expected);
});
