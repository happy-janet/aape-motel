require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const sendEmail = require('./mailer'); // Make sure mailer.js is in the same directory

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB error:', err));

// Booking Schema
const Booking = mongoose.model('Booking', new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  roomType: String,
  checkIn: Date,
  checkOut: Date,
  specialRequests: String
}));

// POST: Room Booking
app.post('/api/book-room', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    const message = `
New Booking Details:
Name: ${req.body.name}
Email: ${req.body.email}
Phone: ${req.body.phone}
Room Type: ${req.body.roomType}
Check-in: ${req.body.checkIn}
Check-out: ${req.body.checkOut}
Special Requests: ${req.body.specialRequests || 'None'}
    `;

    await sendEmail({
      from: req.body.email,
      to: process.env.COMPANY_EMAIL,
      subject: 'New Room Booking – Aape Motel',
      text: message
    });

    res.send('Thank you! Your booking has been submitted.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Booking failed. Please try again.');
  }
});

// POST: Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const emailContent = `
New Contact Inquiry:
Name: ${name}
Email: ${email}
Message: ${message}
    `;

    await sendEmail({
      from: email,
      to: process.env.COMPANY_EMAIL,
      subject: 'New Contact Inquiry – Aape Motel',
      text: emailContent
    });

    res.send('Thank you for contacting us! We shall get back to you soon');
  } catch (error) {
    console.error(error);
    res.status(500).send('Message failed. Please try again.');
  }
});

// Serve Booking Page
app.get('/book-room', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'book-room.html'));
});

// Serve Contact Page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
  
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.COMPANY_EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      });
  
      const mailOptions = {
        from: email,
        to: process.env.COMPANY_EMAIL,
        subject: 'New Contact Message – Aape Motel',
        text: `
  New Contact Message:
  Name: ${name}
  Email: ${email}
  Message: ${message}
        `
      };
  
      await transporter.sendMail(mailOptions);
      res.send('Thank you for contacting Aape Motel!');
    } catch (err) {
      console.error(err);
      res.status(500).send('Message sending failed. Please try again.');
    }
  });
  

// Serve Home Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


