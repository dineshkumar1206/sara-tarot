const Contact = require('../models/Contact');

// @route   POST api/contact
// @desc    Submit contact form message
const submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields (name, email, subject, message) are required.' });
  }

  // Simple email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }

  try {
    // Create new contact message entry in database
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    return res.status(201).json({
      message: 'Your message has been sent successfully.',
      contact: {
        id: newContact.id,
        name: newContact.name,
        email: newContact.email,
        subject: newContact.subject,
        createdAt: newContact.createdAt
      }
    });
  } catch (err) {
    console.error('Contact submission error:', err);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = {
  submitContact
};
