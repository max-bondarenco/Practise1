import { NextFunction, Request, Response } from 'express';
import { db } from '../db/db.js';

export const createFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, content } = req.body;
  if (!name) return res.status(404).send('The filename is required');

  const stmt = db.prepare('INSERT INTO files (name,content) VALUES (?,?)');
  const info = stmt.run(name, content);

  res.status(201).json({ id: info.lastInsertRowid, name, content });
};

export const updateFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, content } = req.body;
  const { id } = req.params;

  const stmt = db.prepare('UPDATE files SET name=?, content=? WHERE id=?');
  const info = stmt.run(name, content, id);

  if (info.changes === 0) return res.status(404).send('File not found');
  res.status(200).json({ id: info.lastInsertRowid, name, content });
};

export const getAllFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = db.prepare('SELECT * FROM files').all();
  res.status(200).json(files);
};

export const getFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const file = db.prepare('SELECT * FROM files WHERE id=?').get(id);
  if (!file) return res.status(404).send('File not found');

  res.status(200).json(file);
};

export const deleteFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const stmt = db.prepare('DELETE FROM files WHERE id=?');
  const info = stmt.run(id);

  if (info.changes === 0) return res.status(404).send('File not found');
  res.status(204).send();
};
