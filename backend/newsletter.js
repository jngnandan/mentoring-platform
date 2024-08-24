const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const router = express.Router();
const subscribersFile = path.join(__dirname, 'subscribers.json');

// Create a transport for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables for credentials
    pass: process.env.EMAIL_PASS
  }
});

// Load subscribers from file
const loadSubscribers = () => {
  if (!fs.existsSync(subscribersFile)) {
    fs.writeFileSync(subscribersFile, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(subscribersFile));
};

// Save subscribers to file
const saveSubscribers = (subscribers) => {
  fs.writeFileSync(subscribersFile, JSON.stringify(subscribers));
};

// Subscribe to newsletter
router.post('/subscribe', (req, res) => {
  console.log('Received request for /subscribe');
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const subscribers = loadSubscribers();
  if (subscribers.includes(email)) {
    return res.status(400).json({ error: 'Email is already subscribed' });
  }

  subscribers.push(email);
  saveSubscribers(subscribers);

  res.status(200).json({ message: 'Subscription successful' });
});

// Unsubscribe from newsletter
router.post('/unsubscribe', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  let subscribers = loadSubscribers();
  subscribers = subscribers.filter(subscriber => subscriber !== email);
  saveSubscribers(subscribers);

  res.status(200).json({ message: 'Unsubscription successful' });
});

// Send newsletter
router.post('/send', async (req, res) => {
  const { subject, message } = req.body;
  if (!subject || !message) {
    return res.status(400).json({ error: 'Subject and message are required' });
  }

  const subscribers = loadSubscribers();

  try {
    await Promise.all(subscribers.map(email =>
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message
      })
    ));
    res.status(200).json({ message: 'Newsletter sent successfully' });
  } catch (error) {
    console.error('Error sending newsletter:', error);
    res.status(500).json({ error: 'Failed to send newsletter' });
  }
});

module.exports = router;
