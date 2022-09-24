import { Request, Response } from "express";
import {
  encode,
  hashPassword,
  comparePassword,
  verifyEmailContent,
  resetPasswordEmailContent,
  decode,
} from "../helper";
import Services from "../services";
import { MailOptions } from "../types";

const { user, mailer } = Services;
const env = process.env.NODE_ENV;

const auth = {
  /**
   * signup
   * @param req
   * @param res
   * @returns
   */
  signup: async (req: Request, res: Response) => {
    const { firstname, lastname, email, password } = req.body;

    const userExist = await user.getUserByEmail(email);
    if (userExist)
      return res.status(409).json({ error: "Email exist, try login" });

    const hashedPassword = await hashPassword(password);

    const data = { firstname, lastname, email, password: hashedPassword };
    const newUser = await user.createUser(data);

    if (env !== "test") {
      // Send email here
      const token = encode({ id: newUser.id });
      const mailOption: MailOptions = {
        receiver: email,
        content: verifyEmailContent(token),
        subject: "Email Verification",
      };
      await mailer(mailOption);
    }

    return res.status(201).json({
      message:
        "User created successfully, check your email to verify your account",
      data: {
        id: newUser.id,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
      },
    });
  },

  /**
   * login
   * @param req
   * @param res
   * @returns
   */
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userAccount = await user.getUserByEmail(email);
    if (!userAccount)
      return res.status(403).json({ error: "Email or Password is incorrect" });

    if (!userAccount.emailVerified)
      return res.status(403).json({ error: "Verify your email first" });

    const validPass = await comparePassword(
      password,
      userAccount.password as string
    );
    if (!validPass)
      return res.status(403).json({
        error: "Email or Password is incorrect",
      });

    const token = encode({ id: userAccount.id, email: userAccount.email });
    return res.status(200).json({
      message: "User logged in successfully",
      token,
      data: {
        id: userAccount.id,
        email: userAccount.email,
        firstname: userAccount.firstname,
        lastname: userAccount.lastname,
      },
    });
  },

  /**
   * verifyEmail
   * @param req
   * @param res
   * @returns
   */
  verifyEmail: async (req: Request, res: Response) => {
    const token = req.query.token as string;
    const payload = decode(token?.split(" ")[0] as string);

    const newUser = await user.getOneUser(Number(payload.id));
    if (!newUser) return res.status(404).json({ error: "User does not exit" });

    const data = { emailVerified: true };
    const updatedUser = await user.updateUser(Number(newUser.id), data);

    return res.status(200).json({
      message: "Email verified successfully",
      token,
      data: {
        id: newUser.id,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        emailVerified: newUser.emailVerified,
      },
    });
  },

  /**
   * ForgetMyPassword
   * @param req
   * @param res
   * @returns
   */
  forgetPassword: async (req: Request, res: Response) => {
    const { email } = req.body;
    const findUser = await user.getUserByEmail(email);
    if (!findUser)
      return res.status(404).json({ error: "No user found with such email" });

    if (env !== "test") {
      // Send email here
      const token = encode({ id: findUser.id });
      const mailOption: MailOptions = {
        receiver: email,
        content: resetPasswordEmailContent(token),
        subject: "Password Reset",
      };
      await mailer(mailOption);
    }

    return res.status(200).json({
      message: "Check your email for reset link !!",
    });
  },

  resetPassword: async (req: Request, res: Response)=>{
    const token = req.query.token as string;
    const payload = decode(token?.split(" ")[0] as string);

    const newUser = await user.getOneUser(Number(payload.id));
    if (!newUser) return res.status(404).json({ error: "User does not exit" });

    const hashedPassword = await hashPassword(req.body.password);
    const updatedUser = await user.updateUser(Number(newUser.id), {password: hashedPassword});

    return res.status(200).json({
      message: "Password reset successfully",
      token,
      data: {
        id: newUser.id,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        emailVerified: newUser.emailVerified,
      },
    });
  }
};

export default auth;
