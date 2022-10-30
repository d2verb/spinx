import { AsciiColor, spin, Spinner } from "../mod.ts";

if (import.meta.main) {
  const spinner = new Spinner({
    message: "Now Loading",
    spinnerColor: AsciiColor.Green,
    messageColor: AsciiColor.Red,
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
