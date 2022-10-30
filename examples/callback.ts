import { spin, Spinner } from "../mod.ts";

if (import.meta.main) {
  const spinner = new Spinner({
    message: "Now Loading",
  });
  await spin(async () => {
    const p = Deno.run({
      cmd: ["sleep", "2"],
      stdout: "piped",
    });
    await p.status();
    await p.close();
  }, spinner);
}
