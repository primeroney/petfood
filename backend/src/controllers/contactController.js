const ContactMessage = require('../models/ContactMessage');
const asyncHandler = require('../utils/asyncHandler');

const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Name, email, and message are required.');
  }

  const contactMessage = await ContactMessage.create({ name, email, message });

  res.status(201).json({
    message: 'Message received.',
    contactMessage
  });
});

const listContactMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
});

module.exports = {
  createContactMessage,
  listContactMessages
};
