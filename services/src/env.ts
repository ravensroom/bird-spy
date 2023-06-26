import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');
const envPath = path.join(rootDir, '.env.local');
dotenv.config({ path: envPath });

console.log(envPath);

const DB_PATH_BASE = process.env.DB_PATH_BASE || '.';
const MAX_ENTRIES_PER_QUERY = +(process.env.MAX_ENTRIES_PER_QUERY || 0);

console.log('Max entries per query:', process.env.MAX_ENTRIES_PER_QUERY);
console.log('DB path:', process.env.DB_PATH_BASE);

export { DB_PATH_BASE, MAX_ENTRIES_PER_QUERY };
