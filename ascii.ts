export enum AsciiColor {
  None = -1,
  Black = 30,
  Red = 31,
  Green = 32,
  Yellow = 33,
  Blue = 34,
  Magenta = 35,
  Cyan = 36,
  White = 37,
}

/**
 * Decorate the given text.
 */
export function decorate(
  text: string,
  color: AsciiColor = AsciiColor.White,
): string {
  if (color === AsciiColor.None) {
    return text;
  }
  return `\x1b[${color}m${text}\x1b[0m`;
}
