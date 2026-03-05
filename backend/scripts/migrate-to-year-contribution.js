/**
 * One-time migration: copy year-related data from users collection
 * into YearContribution collection. Run from backend folder: node scripts/migrate-to-year-contribution.js
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import YearContribution from '../src/model/yearContributionModel.js';

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
  const usersCol = mongoose.connection.db.collection('users');

  const users = await usersCol.find({}).toArray();
  console.log(`Found ${users.length} users to migrate.`);

  for (const doc of users) {
    const userId = doc._id;

    // 2024: pichhlapujaChanda -> pujaChanda, khanaChanda = 0
    const y2024 = {
      user: userId,
      year: '2024',
      pujaChanda: Number(doc.pichhlapujaChanda) || 0,
      khanaChanda: 0,
      date: doc.date ?? '',
      pujaPaid: Boolean(doc.pujaPaid),
      khanaPaid: Boolean(doc.khanaPaid),
      comment: doc.comment ?? ''
    };
    await YearContribution.findOneAndUpdate(
      { user: userId, year: '2024' },
      { $set: y2024 },
      { upsert: true, new: true }
    );

    // 2025: pujaChanda, khanaChanda from doc
    const y2025 = {
      user: userId,
      year: '2025',
      pujaChanda: Number(doc.pujaChanda) || 0,
      khanaChanda: Number(doc.khanaChanda) || 0,
      date: doc.date ?? '',
      pujaPaid: Boolean(doc.pujaPaid),
      khanaPaid: Boolean(doc.khanaPaid),
      comment: doc.comment ?? ''
    };
    await YearContribution.findOneAndUpdate(
      { user: userId, year: '2025' },
      { $set: y2025 },
      { upsert: true, new: true }
    );

    // Any existing yearlyContributions (e.g. 2026, 2027) - migrate same field names
    const yc = doc.yearlyContributions;
    if (yc && typeof yc === 'object' && Object.keys(yc).length > 0) {
      for (const year of Object.keys(yc)) {
        if (year === '2024' || year === '2025') continue; // already done
        const row = yc[year];
        const payload = {
          user: userId,
          year,
          pujaChanda: Number(row?.pujaChanda) || 0,
          khanaChanda: Number(row?.khanaChanda) || 0,
          date: row?.date ?? '',
          pujaPaid: Boolean(row?.pujaPaid),
          khanaPaid: Boolean(row?.khanaPaid),
          comment: row?.comment ?? ''
        };
        await YearContribution.findOneAndUpdate(
          { user: userId, year },
          { $set: payload },
          { upsert: true, new: true }
        );
      }
    }
  }

  console.log('Migration complete.');
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
