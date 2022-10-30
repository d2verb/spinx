import { spin, Spinner } from "../mod.ts";

if (import.meta.main) {
  const spinner = new Spinner({
    message: "Now Loading",
  });

  const fn = async () => {
    const p = Deno.run({
      cmd: ["sleep", "2"],
      stdout: "piped",
    });
    await p.status();
    await p.close();
  };

  // We can pass both async function and its return value (Promise) to spin()
  await spin(fn, spinner);
  await spin(fn(), spinner);
}
