import UserServices from "./user";
import MailerService from "./mailer";

export default {
  user: new UserServices(),
  mailer: new MailerService(),
};
