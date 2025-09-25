import Database from 'better-sqlite3';

export const db = new Database('files.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    content TEXT
  )
`);
