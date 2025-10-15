import { NextFunction, Request, Response } from 'express';
import { decryptCaesar, encryptCaesar } from '../crypts/caesar.js';
import { decryptTrithemius, encryptTrithemius } from '../crypts/trithemius.js';
import { decryptBook, encryptBook } from '../crypts/book.js';
import { decryptGamma, encryptGamma } from '../crypts/gamma.js';

const CYPHERS = [
  { name: 'Caesar', val: 'csr' },
  { name: 'Trithemius', val: 'tms' },
  { name: 'Book', val: 'boo' },
  { name: 'Gamma', val: 'gam' }
];

const mapping: Record<string, any> = {
  csr: { enc: encryptCaesar, dec: decryptCaesar },
  tms: { enc: encryptTrithemius, dec: decryptTrithemius },
  boo: { enc: encryptBook, dec: decryptBook },
  gam: { enc: encryptGamma, dec: decryptGamma }
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
