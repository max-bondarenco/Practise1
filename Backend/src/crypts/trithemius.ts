import { ALPHABETS } from './caesar.js';

const extractTrithemiusKey = (key: string) => {
  try {
    const arr = key.split(',').map((a) => +a);
    if (arr.length > 3 || arr.length < 2) return key;
    return arr;
  } catch (_) {
    return key;
  }
};

const getTrithemiusShift = (i: number, key: any): number => {
  if (Array.isArray(key)) {
    if (key.length === 2) {
      const [a, b] = key;
      return a * i + b;
    } else if (key.length === 3) {
      const [a, b, c] = key;
      return a * i * i + b * i + c;
    }
  } else if (typeof key === 'string') {
    const idx = i % key.length;
    return key.charCodeAt(idx);
  }
  return 0;
};

export const encryptTrithemius = (content: string, data: any) => {
  const key = extractTrithemiusKey(data.key);
  let newContent = '';

  outer: for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const shift = getTrithemiusShift(i, key);

    for (const alphabet of ALPHABETS) {
      const idx = alphabet.indexOf(char);
      if (idx === -1) continue;
      newContent += alphabet[(idx + shift) % alphabet.length];
      continue outer;
    }
    newContent += char;
  }

  return newContent;
};

export const decryptTrithemius = (content: string, data: any) => {
  const key = extractTrithemiusKey(data.key);
  let newContent = '';

  outer: for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const shift = getTrithemiusShift(i, key);

    for (const alphabet of ALPHABETS) {
      const idx = alphabet.indexOf(char);
      if (idx === -1) continue;
      newContent +=
        alphabet[
          (idx - (shift % alphabet.length) + alphabet.length) % alphabet.length
        ];
      continue outer;
    }
    newContent += char;
  }

  return newContent;
};
