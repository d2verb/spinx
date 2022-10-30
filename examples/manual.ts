import { Spinner } from "../mod.ts";

async function run(spinner: Spinner) {
  spinner.start();
  const p = Deno.run({
    cmd: ["sleep", "2"],
    stdout: "piped",
  });
  await p.status();
  await p.close();
  spinner.stop();
}

if (import.meta.main) {
  const spinner = new Spinner({
    message: "Now Loading",
  });

  // Start and stop spinner manually
  await run(spinner);

  // We can restart spinner
  await run(spinner);
}
