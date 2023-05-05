export type UserType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  emailVerified?: boolean;
  otp?: number;
};

export type MailOptions = {
  receiver: string;
  subject: string;
  content: string;
};

export enum mailType {
  "VERIFY",
  "RESET",
  "OTP",
}
