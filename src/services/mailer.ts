import nodemailer from "nodemailer";
import { MailOptions } from "../types";

const { SMTP_USERNAME, SMTP_PASSWORD } = process.env;

/**
 * sendMail
 * @param receiver 
 * @param subject 
 * @param content 
 */
const sendMail = async (mailOption:MailOptions) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"zPlatform" <noreply@zplatform.com>',
      to: mailOption.receiver,
      subject: mailOption.subject,
      html: mailOption.content,
    });
};

export default sendMail;
