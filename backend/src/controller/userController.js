import User from '../model/userModel.js';
import YearContribution from '../model/yearContributionModel.js';

const DEFAULT_YEAR = '2025';

// Build API shape: user doc + yearlyContributions from YearContribution docs. For 2024 add pichhlapujaChanda = pujaChanda for frontend.
function buildYearlyContributionsResponse(userDoc, contributions) {
  const doc = userDoc.toObject ? userDoc.toObject() : { ...userDoc };
  const yc = {};
  for (const row of contributions) {
    const year = String(row.year);
    yc[year] = {
      pujaChanda: row.pujaChanda ?? 0,
      khanaChanda: row.khanaChanda ?? 0,
      date: row.date ?? '',
      pujaPaid: row.pujaPaid ?? false,
      khanaPaid: row.khanaPaid ?? false,
      comment: row.comment ?? ''
    };
    if (year === '2024') yc[year].pichhlapujaChanda = yc[year].pujaChanda;
  }
  return { ...doc, yearlyContributions: yc };
}

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const newUser = new User({ name, phone: phone || '' });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user details: User + YearContribution rows -> yearlyContributions
export const getUserDetails = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const contributions = await YearContribution.find({ user: id }).lean();
    res.json(buildYearlyContributionsResponse(user, contributions));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user: User name/phone + upsert YearContribution for given year. For 2024 map pichhlapujaChanda -> pujaChanda.
export const updateUser = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { year, name, phone, pichhlapujaChanda, pujaChanda, khanaChanda, date, comment, pujaPaid, khanaPaid } = req.body;
    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    await user.save();

    const yearStr = String(year || DEFAULT_YEAR).trim();
    let puja = pujaChanda !== undefined ? Number(pujaChanda) || 0 : undefined;
    if (yearStr === '2024' && pichhlapujaChanda !== undefined) puja = Number(pichhlapujaChanda) || 0;
    const khana = khanaChanda !== undefined ? Number(khanaChanda) || 0 : undefined;

    const update = {};
    if (puja !== undefined) update.pujaChanda = puja;
    if (khana !== undefined) update.khanaChanda = khana;
    if (date !== undefined) update.date = date;
    if (comment !== undefined) update.comment = comment;
    if (pujaPaid !== undefined) update.pujaPaid = Boolean(pujaPaid);
    if (khanaPaid !== undefined) update.khanaPaid = Boolean(khanaPaid);

    const existing = await YearContribution.findOne({ user: id, year: yearStr }).lean();
    const merged = {
      pujaChanda: update.pujaChanda ?? existing?.pujaChanda ?? 0,
      khanaChanda: update.khanaChanda ?? existing?.khanaChanda ?? 0,
      date: update.date ?? existing?.date ?? '',
      comment: update.comment ?? existing?.comment ?? '',
      pujaPaid: update.pujaPaid ?? existing?.pujaPaid ?? false,
      khanaPaid: update.khanaPaid ?? existing?.khanaPaid ?? false
    };
    await YearContribution.findOneAndUpdate(
      { user: id, year: yearStr },
      { $set: { ...merged, user: id, year: yearStr } },
      { upsert: true, new: true }
    );

    const contributions = await YearContribution.find({ user: id }).lean();
    res.json({ message: 'User updated successfully', user: buildYearlyContributionsResponse(user, contributions) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user: remove all YearContribution for user, then delete User
export const deleteUser = async (req, res) => {
  const { id } = req.query;
  try {
    await YearContribution.deleteMany({ user: id });
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GetAllUsers: attach contribution for given year (query.year, default 2025) so list/totals are from year table
export const getAllUsers = async (req, res) => {
  try {
    const year = (req.query.year && String(req.query.year).trim()) || DEFAULT_YEAR;
    const users = await User.find().lean();
    const userIds = users.map((u) => u._id);
    const contributions = await YearContribution.find({ user: { $in: userIds }, year }).lean();
    const byUser = {};
    for (const row of contributions) byUser[row.user.toString()] = row;
    const list = users.map((u) => {
      const y = byUser[u._id.toString()];
      return {
        ...u,
        pujaChanda: y ? y.pujaChanda : 0,
        khanaChanda: y ? y.khanaChanda : 0
      };
    });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Legacy single-field endpoints: operate on YearContribution for year 2025 (phone updates User) ---

async function upsertYearContributionForUser(userId, year, setFields) {
  await YearContribution.findOneAndUpdate(
    { user: userId, year },
    { $set: setFields },
    { upsert: true, new: true }
  );
}

export const pujaChanda = async (req, res) => {
  try {
    const { amount } = req.body;
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await upsertYearContributionForUser(id, DEFAULT_YEAR, { pujaChanda: Number(amount) || 0 });
    const contributions = await YearContribution.find({ user: id }).lean();
    res.json({ message: 'Contribution updated', user: buildYearlyContributionsResponse(user, contributions) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const pichhlapujaChanda = async (req, res) => {
  try {
    const { amount } = req.body;
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await upsertYearContributionForUser(id, '2024', { pujaChanda: Number(amount) || 0 });
    const contributions = await YearContribution.find({ user: id }).lean();
    res.json({ message: 'Contribution updated', user: buildYearlyContributionsResponse(user, contributions) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const khanaChanda = async (req, res) => {
  try {
    const { amount } = req.body;
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await upsertYearContributionForUser(id, DEFAULT_YEAR, { khanaChanda: Number(amount) || 0 });
    const contributions = await YearContribution.find({ user: id }).lean();
    res.json({ message: 'Contribution updated', user: buildYearlyContributionsResponse(user, contributions) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const total = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    let y = await YearContribution.findOne({ user: id, year: DEFAULT_YEAR }).lean();
    if (!y) {
      await upsertYearContributionForUser(id, DEFAULT_YEAR, { pujaChanda: 0, khanaChanda: 0 });
      y = { pujaChanda: 0, khanaChanda: 0 };
    }
    const contributions = await YearContribution.find({ user: id }).lean();
    res.json({ message: 'Contribution updated', user: buildYearlyContributionsResponse(user, contributions) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const date = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { date } = req.body;
    await upsertYearContributionForUser(id, DEFAULT_YEAR, { date: date ?? '' });
    const contributions = await YearContribution.find({ user: id }).lean();
    res.json({ message: 'Contribution updated', user: buildYearlyContributionsResponse(user, contributions) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const phone = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { phone } = req.body;
    user.phone = phone ?? '';
    await user.save();
    const contributions = await YearContribution.find({ user: id }).lean();
    res.json({ message: 'Contribution updated', user: buildYearlyContributionsResponse(user, contributions) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const comment = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { comment } = req.body;
    await upsertYearContributionForUser(id, DEFAULT_YEAR, { comment: comment ?? '' });
    const contributions = await YearContribution.find({ user: id }).lean();
    res.json({ message: 'Contribution updated', user: buildYearlyContributionsResponse(user, contributions) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const pujaPaid = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    let y = await YearContribution.findOne({ user: id, year: DEFAULT_YEAR });
    if (!y) {
      y = await YearContribution.create({ user: id, year: DEFAULT_YEAR, pujaPaid: true });
    } else {
      y.pujaPaid = !y.pujaPaid;
      await y.save();
    }
    const contributions = await YearContribution.find({ user: id }).lean();
    res.json({ message: 'Payment status toggled', user: buildYearlyContributionsResponse(user, contributions) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const khanPaid = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    let y = await YearContribution.findOne({ user: id, year: DEFAULT_YEAR });
    if (!y) {
      y = await YearContribution.create({ user: id, year: DEFAULT_YEAR, khanaPaid: true });
    } else {
      y.khanaPaid = !y.khanaPaid;
      await y.save();
    }
    const contributions = await YearContribution.find({ user: id }).lean();
    res.json({ message: 'Payment status toggled', user: buildYearlyContributionsResponse(user, contributions) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
