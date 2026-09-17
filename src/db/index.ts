import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import path from 'path';
import fs from 'fs';
import * as schema from './schema';

const isVercel = process.env.VERCEL === '1';
let dbPath: string;

if (isVercel) {
  // On Vercel, the filesystem is read-only except for /tmp.
  // We copy the bundled seeded database to /tmp so the app can read/write during the mockup.
  dbPath = path.join('/tmp', 'villa.db');
  if (!fs.existsSync(/*turbopackIgnore: true*/ dbPath)) {
    const bundledDbPath = path.join(process.cwd(), 'data', 'villa.db');
    if (fs.existsSync(/*turbopackIgnore: true*/ bundledDbPath)) {
      fs.copyFileSync(bundledDbPath, dbPath);
    }
  }
} else {
  // Local development
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  dbPath = path.join(dataDir, 'villa.db');
}

const client = createClient({
  url: `file:${dbPath}`,
});

export const db = drizzle(client, { schema });
