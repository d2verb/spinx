import { AsciiColor, decorate } from "./ascii.ts";

type valueOf<T> = T[keyof T];

export const SPINNER_PATTERNS = {
  dots: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
} as const;

export type SpinnerPattern = valueOf<typeof SPINNER_PATTERNS>;

export type SpinnerOptions = {
  pattern: SpinnerPattern;
  ms: number;
  message: string;
  spinnerColor: AsciiColor;
  messageColor: AsciiColor;
};

export const DEFAULT_SPINNER_OPTIONS: SpinnerOptions = {
  pattern: SPINNER_PATTERNS.dots,
  ms: 80,
  message: "",
  spinnerColor: AsciiColor.Cyan,
  messageColor: AsciiColor.None,
} as const;

/**
 * Spinner class.
 */
export class Spinner {
  private options: SpinnerOptions;
  private intervalID?: number;
  private patternPos = 0;

  /**
   * Spinner constructor
   */
  constructor(options?: Partial<SpinnerOptions>) {
    this.options = {
      ...DEFAULT_SPINNER_OPTIONS,
      ...options,
    };
  }

  /**
   * start spinner. spinner text will be displayed and updated til stop() called.
   */
  start() {
    if (this.intervalID) {
      return;
    }
    this.intervalID = setInterval(() => {
      const spinnerText = "\r" +
        decorate(
          this.options.pattern[this.patternPos],
          this.options.spinnerColor,
        ) + " " +
        decorate(this.options.message, this.options.messageColor);
      Deno.stdout.write(new TextEncoder().encode(spinnerText));
      this.patternPos = (this.patternPos + 1) % this.options.pattern.length;
    }, this.options.ms);
  }

  /**
   * stop spinner and clear its internal state.
   */
  stop() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
      Deno.stdout.write(Uint8Array.from([0xa])); // newline
      this.patternPos = 0;
      this.intervalID = undefined;
    }
  }
}

// deno-lint-ignore no-explicit-any
type AsyncFn<T> = (...args: any[]) => Promise<T>;

/**
 * Spin the spinner while the callback function is executing.
 *
 * @param cb promise and callback async function
 * @param spinner spinner class instance
 * @returns new promise that stops spinner when it fulfilled
 */
export function spin<T>(
  cb: Promise<T> | AsyncFn<T>,
  spinner: Spinner = new Spinner(),
): Promise<T> {
  spinner.start();
  return (("finally" in cb) ? cb : cb()).finally(() => spinner.stop());
}
