export const circularIndex = (index: number, length: number) => {
  return ((index % length) + length) % length;
};

export const circularNext = (index: number, length: number) => {
  return (index + 1) % length;
};

export const circularPrev = (index: number, length: number) => {
  return (index - 1 + length) % length;
};

export const circularSlice = <T>(arr: T[], start: number, length: number) => {
  const result: T[] = [];
  const n = arr.length;

  let normalizedStart = ((start % n) + n) % n;

  for (let i = 0; i < length; i++) {
    result.push(arr[(normalizedStart + i) % n]);
  }

  return result;
}