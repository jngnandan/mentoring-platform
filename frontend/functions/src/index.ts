/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';

// Use Firebase environment variables to keep sensitive credentials secure
const gmailUser = process.env.FIREBASE_CONFIG ? process.env.GMAIL_EMAIL : 'your-email@gmail.com';
const gmailPass = process.env.FIREBASE_CONFIG ? process.env.GMAIL_PASSWORD : 'your-email-password';

// Configure the email transport using Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailUser,
    pass: gmailPass,
  },
});

// Define the sendEmail function
export const sendEmail = onRequest((request, response) => {
  const { email, subject, message } = request.body;

  // Validate input
  if (!email || !subject || !message) {
    response.status(400).send("Missing email, subject, or message in request body");
    return;
  }

  const mailOptions = {
    from: gmailUser,
    to: email,
    subject: subject,
    text: message,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
    if (error) {
      logger.error("Error sending email", error);
      response.status(500).send(error.toString());
      return;
    }
    logger.info("Email sent successfully", info.response);
    response.status(200).send(`Email sent: ${info.response}`);
  });
});