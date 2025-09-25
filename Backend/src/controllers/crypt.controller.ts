import { NextFunction, Request, Response } from 'express';

const CYPHERS = [
  { name: 'Caesar', val: 'csr' },
  { name: 'Trithemius', val: 'tms' }
];

const ALPHABETS = [
  'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ',
  'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'abcdefghijklmnopqrstuvwxyz',
  '0123456789'
];

// Caesar
const encryptCaesar = (content: string, data: any) => {
  const { key } = data;
  let newContent = '';

  outer: for (const char of content) {
    for (const alphabet of ALPHABETS) {
      const idx = alphabet.indexOf(char);
      if (idx === -1) continue;
      newContent += alphabet[(idx + key) % alphabet.length];
      continue outer;
    }
    newContent += char;
  }

  return newContent;
};

const decryptCaesar = (content: string, data: any) => {
  const { key } = data;
  let newContent = '';

  outer: for (const char of content) {
    for (const alphabet of ALPHABETS) {
      const idx = alphabet.indexOf(char);
      if (idx === -1) continue;
      newContent += alphabet[(idx - key + alphabet.length) % alphabet.length];
      continue outer;
    }
    newContent += char;
  }

  return newContent;
};

// Trithemius
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

const encryptTrithemius = (content: string, data: any) => {
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

const decryptTrithemius = (content: string, data: any) => {
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

// Other logic
const mapping: Record<string, any> = {
  csr: { enc: encryptCaesar, dec: decryptCaesar },
  tms: { enc: encryptTrithemius, dec: decryptTrithemius }
};

export const getAllCrypts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json(CYPHERS);
};

export const encrypt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { content, method, operation, ...data } = req.body;

  const func = mapping[method][operation];
  if (!func) return res.status(400).send('Unsuported encryption method');

  res.status(200).json(func(content, data));
};
