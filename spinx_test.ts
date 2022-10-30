import { assertEquals } from "https://deno.land/std@0.161.0/testing/asserts.ts";

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
