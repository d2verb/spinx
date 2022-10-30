# spinx - A Simple Terminal Spinner for Deno
[![ci](https://github.com/d2verb/spinx/actions/workflows/ci.yml/badge.svg)](.github/workflows/ci.yml)
[![deno version](https://img.shields.io/badge/deno-%5E1.27.0-green?logo=deno)](https://deno.land)
[![deno.land](https://img.shields.io/github/v/tag/d2verb/spinx?style=flat&logo=deno&label=deno.land&color=steelblue&sort=semver)](https://deno.land/x/spinx)
[![LICENSE](https://img.shields.io/badge/license-MIT-brightgreen)](LICENSE)

## Usage

More examples can be found under [examples/](examples/)

```ts
import { spin, Spinner } from "../mod.ts";

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
```

## LICENSE
MIT