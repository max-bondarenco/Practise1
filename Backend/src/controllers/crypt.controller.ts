import { NextFunction, Request, Response } from 'express';
import { decryptCaesar, encryptCaesar } from '../crypts/caesar.js';
import { decryptTrithemius, encryptTrithemius } from '../crypts/trithemius.js';
import { decryptBook, encryptBook } from '../crypts/book.js';
import { decryptGamma, encryptGamma } from '../crypts/gamma.js';
import {
  decryptBackpack,
  encryptBackpack,
  generateKeyPair
} from '../crypts/backpack.js';
import { catcher } from './errCatcher.js';

const CYPHERS = [
  { name: 'Caesar', val: 'csr' },
  { name: 'Trithemius', val: 'tms' },
  { name: 'Book', val: 'boo' },
  { name: 'Gamma', val: 'gam' },
  { name: 'Backpack', val: 'bck' }
];

const mapping: Record<string, any> = {
  csr: { enc: encryptCaesar, dec: decryptCaesar },
  tms: { enc: encryptTrithemius, dec: decryptTrithemius },
  boo: { enc: encryptBook, dec: decryptBook },
  gam: { enc: encryptGamma, dec: decryptGamma },
  bck: { enc: encryptBackpack, dec: decryptBackpack, key: generateKeyPair }
};

export const getAllCrypts = catcher(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(CYPHERS);
  }
);

export const encrypt = catcher(
  async (req: Request, res: Response, next: NextFunction) => {
    const { content, method, operation, ...data } = req.body;

    const func = mapping[method][operation];
    if (!func) return res.status(400).send('Unsuported encryption method');

    res.status(200).json(func(content, data));
  }
);

export const keygen = catcher(
  async (req: Request, res: Response, next: NextFunction) => {
    const { content, method, operation, ...data } = req.body;

    const func = mapping[method][operation];
    if (!func) return res.status(400).send('Unsuported encryption method');

    res.status(200).json(func(data));
  }
);
