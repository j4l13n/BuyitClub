import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const { OAuth2 } = google.auth;

/**
 * Send Email Verification
 */
class SendVerificationEmail {
  // eslint-disable-next-line valid-jsdoc
  /**
    *
    * @param {string} token
    * @param {string} email
    * @return message sent
    */
  static async send(token, email) {
    const oauth2Client = new OAuth2(
      '207391721395-nr9q4f02giavmn6bj91lgosf6ordht9h.apps.googleusercontent.com',
      'nfjp3BycPRO-kmExVAMSZjqu', // Client Secret
      'https://developers.google.com/oauthplayground' // Redirect URL
    );

    await oauth2Client.setCredentials({
      refresh_token: '1/8NY6gHcgF7MzygPf2Fd-YkkVsRRW53xYC5-UpWuACXuyB8I82ozKwpDhL7_mOwxo'
    });
    const tokens = await oauth2Client.refreshAccessToken();
    const accessToken = tokens.credentials.access_token;

    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'juliushirwa@gmail.com',
        clientId: '207391721395-nr9q4f02giavmn6bj91lgosf6ordht9h.apps.googleusercontent.com',
        clientSecret: 'nfjp3BycPRO-kmExVAMSZjqu',
        refreshToken: '1/8NY6gHcgF7MzygPf2Fd-YkkVsRRW53xYC5-UpWuACXuyB8I82ozKwpDhL7_mOwxo',
        accessToken
      }
    });

    const mailOptions = {
      from: 'no-reply@buyit.rw',
      to: email,
      subject: `Hello ${email}`,
      text: 'Buy is giving you an opportunity to buy and sell online.',
      generateTextFromHTML: true,
      html: `<p>Hello There, <br />
             Thank you for registering to Buyit,<br />
             we are happy to continue to serve you. click the following button to verify your account.<form action='${process.env.HOST}/verification?token=${token}&email=${email}' method='post'><input type='submit' value='Verify email' style='margin-left: 80px; padding-top: 8px; padding-bottom: 8px; padding-left: 20px; padding-right: 20px; background-color: orange; color: white; border-radius: 5px; cursor: pointer;'/></form></p>
             <br />
             <p>Thanks, regards Lobos</p>
      `
    };

    return smtpTransport.sendMail(mailOptions);
  }
}


export default SendVerificationEmail;
