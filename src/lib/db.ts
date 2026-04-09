import Database from 'better-sqlite3';
import path from 'path';
import { readdirSync,mkdirSync } from 'fs';

// Database file path
const dbPath = path.join(process.cwd(), 'data', 'users.db');

// Ensure data directory exists
try {
  mkdirSync(path.dirname(dbPath), { recursive: true });
} catch (err) {
  // Directory already exists
}

// Initialize database connection
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create users table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
`);

export default db;
