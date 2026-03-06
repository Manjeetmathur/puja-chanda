/**
 * One-time migration: set year "2025" for all existing expenses that have no year.
 * Run from backend folder: node scripts/migrate-expense-year.js
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI not set in .env');
  process.exit(1);
}

async function run() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const collection = db.collection('expenses');

  const result = await collection.updateMany(
    { $or: [{ year: { $exists: false } }, { year: null }, { year: '' }] },
    { $set: { year: '2025' } }
  );

  console.log(`Expense migration: matched ${result.matchedCount}, modified ${result.modifiedCount}.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
