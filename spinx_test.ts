import { assertEquals, assert } from "https://deno.land/std@0.161.0/testing/asserts.ts";
import { FakeTime } from "https://deno.land/std@0.161.0/testing/time.ts";
import { Buffer } from "https://deno.land/std/io/buffer.ts";
import { Spinner, SPINNER_PATTERNS } from "./spinx.ts";
import { AsciiColor } from "./ascii.ts";

Deno.test({
  name: "All exmplaes exit with 0",
  fn: async () => {
    for await (const entry of Deno.readDir("./examples")) {
      if (entry.isDirectory) continue;

      const path = `./examples/${entry.name}`;
      const p = Deno.run({
        cmd: ["deno", "run", "--allow-run", path],
        stdout: "piped",
      });

      const { code } = await p.status();
      assertEquals(code, 0);
      await p.close();
    }
  },
  sanitizeResources: false,
});

Deno.test("Spinner writes text to the given writer after `ms` milliseconds passed", () => {
  const time = new FakeTime();

  try {
    // create spinner instance
    const buffer = new Buffer();
    const pattern = SPINNER_PATTERNS.dots;
    const message = "Now Loading";
    const spinner = new Spinner({
      pattern: pattern,
      ms: 100,
      message: message,
      spinnerColor: AsciiColor.None,
      messageColor: AsciiColor.None,
    }, buffer);

    // start spinner
    spinner.start();

    // add 50ms
    // nothing happened because the update interval is 100 ms
    time.tick(50);
    assert(buffer.empty());

    // add extra 50ms
    // the first output occurs here
    time.tick(50);
    assert(!buffer.empty());

    const gotOutput = new TextDecoder().decode(buffer.bytes());
    const expected = `\r${pattern[0]} ${message}`;
    assertEquals(gotOutput, expected);
  } finally {
    time.restore();
  }
});