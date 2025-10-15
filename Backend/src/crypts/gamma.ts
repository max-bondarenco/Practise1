const textToBytes = (text: string): number[] =>
  Array.from(new TextEncoder().encode(text));

const bytesToText = (bytes: number[]): string =>
  new TextDecoder().decode(new Uint8Array(bytes));

const xorBytes = (data: number[], gamma: number[]): number[] =>
  data.map((charCode, i) => charCode ^ gamma[i]);

const generateGamma = (length: number, seed: number): number[] => {
  const gamma: number[] = [];

  for (let i = 0; i < length; i++) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    gamma.push(seed % 256);
  }

  return gamma;
};

export const encryptGamma = (content: string, data: any) => {
  const { key } = data;

  const textBytes = textToBytes(content);

  const seed = Array.from(`${key}`).reduce(
    (acc, c) => acc + c.charCodeAt(0),
    0
  );

  const gamma = generateGamma(textBytes.length, seed);

  const encrypted = xorBytes(textBytes, gamma);
  return encrypted.map((b) => b.toString(16).padStart(2, '0')).join(' ');
};

export const decryptGamma = (content: string, data: any) => {
  const { key } = data;

  const seed = Array.from(`${key}`).reduce(
    (acc, c) => acc + c.charCodeAt(0),
    0
  );

  const encryptedBytes = content
    .split(' ')
    .map((b) => parseInt(b, 16))
    .filter((n) => !isNaN(n));

  const gamma = generateGamma(encryptedBytes.length, seed);
  const decryptedBytes = xorBytes(encryptedBytes, gamma);

  return bytesToText(decryptedBytes);
};
