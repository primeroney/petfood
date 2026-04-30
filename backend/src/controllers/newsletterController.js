const Subscriber = require('../models/Subscriber');
const asyncHandler = require('../utils/asyncHandler');

const listSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Subscriber.find().sort({ createdAt: -1 });
  res.json(subscribers);
});

const subscribe = asyncHandler(async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400);
    throw new Error('A valid email address is required.');
  }

  const subscriber = await Subscriber.findOneAndUpdate(
    { email },
    { email, source: req.body.source || 'website' },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(201).json({
    message: 'Newsletter subscription saved.',
    subscriber
  });
});

const unsubscribe = asyncHandler(async (req, res) => {
  await Subscriber.findOneAndDelete({ email: req.params.email.toLowerCase() });
  res.json({ message: 'Subscriber removed.' });
});

module.exports = {
  listSubscribers,
  subscribe,
  unsubscribe
};
