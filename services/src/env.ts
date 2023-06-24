import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');
const envPath = path.join(rootDir, '.env.local');
dotenv.config({ path: envPath });

const CONFIG_PATH_BASE = process.env.CONFIG_PATH_BASE;
const DB_PATH_BASE = process.env.DB_PATH_BASE;
const MAX_ENTRIES_PER_QUERY = +(process.env.MAX_ENTRIES_PER_QUERY || 0);

console.log('Max entries per query:', process.env.MAX_ENTRIES_PER_QUERY);
console.log('DB path:', process.env.DB_PATH_BASE);
console.log('Config Path:', process.env.CONFIG_PATH_BASE);

export { CONFIG_PATH_BASE, DB_PATH_BASE, MAX_ENTRIES_PER_QUERY };
