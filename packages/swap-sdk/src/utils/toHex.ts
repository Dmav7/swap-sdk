export function toHex(bigint: bigint) {
  let hex = bigint.toString(16);
  if (hex.length % 2 !== 0) {
    hex = `0${hex}`;
  }
  return `0x${hex}`;
}
