require("dotenv").config({path: "../.env"});
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const { google } = require("googleapis");
const cors = require('cors');
const OAuth2 = google.auth.OAuth2;
const express = require('express');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON data
app.use(bodyParser.json());
app.post('/api/send-email', (req, res) => {
  const { contactName, email, nameplate, motorInfo, assembly, application, additionalInfo } = req.body;

  // Compose the email
  const mailOptions = {
    from: process.env.EMAIL,
    to: 'kennanrsb@gmail.com', //Recipient email address goes here
    subject: 'Torq-Match Website Contact Form Submission',
    html: `
      <h3>New Inquiry</h3>
      <p><strong>Name:</strong> ${contactName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Nameplate:</strong> ${nameplate}</p>
      <p><strong>Motor Info:</strong> ${motorInfo}</p>
      <p><strong>Assembly:</strong> ${assembly}</p>
      <p><strong>Application:</strong> ${application}</p>
      <p><strong>Additional Information:</strong> ${additionalInfo}</p>
    `
  };

  const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token :(" + err);
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
      }
    });

    return transporter;
  };

  const sendEmail = async (mailOpt) => {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(mailOpt);
  };

  // Send the email
  sendEmail(mailOptions);
  res.send({message: 'Form submitted successfully'});
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
