require("dotenv").config({path: "../.env"});
const nodemailer = require("nodemailer");
const multer = require("multer");
const bodyParser = require('body-parser');
const { google } = require("googleapis");
const cors = require('cors');
const OAuth2 = google.auth.OAuth2;
const express = require('express');
const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the path to the "uploads" directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});

const upload = multer({ storage });

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON data
app.use(bodyParser.json());
app.post('/api/send-email', upload.single('attachment'), (req, res) => {

  const { contactName, email, nameplate, motorInfo, assembly, application, additionalInfo, attachment } = req.body;
  const uploadedFile = req.file;

  // Compose the email
  const mailOptions = {
    from: process.env.EMAIL,
    to: 'torqmatch.inquiries@gmail.com', //Recipient email address goes here
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

  if(uploadedFile) {
    mailOptions.attachments = [
      {
        filename: uploadedFile.originalname, // The name you want for the attachment
        path: uploadedFile.path, // Path to the file you want to attach
      },
    ];
  }

  const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });

    let accessToken;
    try {
      accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token);
        });
      });
    } catch (error) {
      console.error('Creation of access token failed: ', error);
    }

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
  sendEmail(mailOptions, (error, info) => {
    if(error) {
      console.error('Error sending email: ', error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
  res.send({message: 'Form submitted successfully'});
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
