import { NextFunction, Request, Response } from 'express';

const CYPHERS = [{ name: 'Caesar', val: 'csr' }];

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

const ALPHABETS = [
  'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ',
  'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'abcdefghijklmnopqrstuvwxyz',
  '0123456789'
];

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

const mapping: Record<string, any> = {
  csr: { enc: encryptCaesar, dec: decryptCaesar }
};
