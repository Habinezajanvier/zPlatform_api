import nodemailer from "nodemailer";
import { MailOptions, mailType } from "../types";
import {
  otp,
  resetPasswordEmailContent,
  sendOtpEmail,
  verifyEmailContent,
} from "../helper";

const { SMTP_USERNAME, SMTP_PASSWORD, NODE_ENV } = process.env;

class MailerService {
  subject: string;
  content: string;
  token: string;

  constructor() {
    this.subject = "";
    this.content = "";
    this.token = "";
  }

  /**
   * sendMail
   * @param receiver
   * @param subject
   * @param content
   */
  private sendMail = async (mailOption: MailOptions) => {
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

  /**
   *
   * @param email
   * @param type
   * @returns
   */
  private generateEmailOptions = async (
    email: string,
    type: mailType
  ): Promise<MailOptions> => {
    if (type === mailType.VERIFY) {
      this.content = verifyEmailContent(this.token);
      this.subject = "Email Verification";
    }
    if (type === mailType.RESET) {
      this.content = resetPasswordEmailContent(this.token);
      this.subject = "Password Reset";
    }
    if (type === mailType.OTP) {
      this.content = sendOtpEmail(this.token);
      this.subject = "One Time Password (OTP)";
    }
    return {
      receiver: email,
      subject: this.subject,
      content: this.content,
    };
  };

  /**
   * mail
   * @param email
   * @param type
   * @param token
   */
  mailer = async (email: string, type: mailType, token?: string) => {
    if (NODE_ENV !== "test") {
      token ? (this.token = token) : "";
      const options = await this.generateEmailOptions(email, type);
      await this.sendMail(options);
    }
  };
}

export default MailerService;
