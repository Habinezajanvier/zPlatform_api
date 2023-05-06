import { Request, Response } from "express";
import { encode, hashPassword, comparePassword, decode, otp } from "../helper";
import Services from "../services";
import { mailType } from "../types";

const { user, mailer } = Services;

class AuthController {
  /**
   * signup
   * @param req
   * @param res
   * @returns
   */
  public signup = async (req: Request, res: Response) => {
    const { firstname, lastname, email, password } = req.body;

    const userExist = await user.getUserByEmail(email);
    if (userExist)
      return res.status(409).json({ error: "Email exist, try login" });

    const hashedPassword = await hashPassword(password);

    const data = { firstname, lastname, email, password: hashedPassword };

    const token = encode({ email });
    await mailer.mailer(email, mailType.VERIFY, token);

    const newUser = await user.createUser(data);

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
  };

  /**
   * login
   * @param req
   * @param res
   * @returns
   */
  public login = async (req: Request, res: Response) => {
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

    const currentTime = new Date();
    const lastLoginTime = new Date(userAccount.lastLogin);

    const userOtp = otp();

    await user.updateUser(userAccount.id, {
      otp: userOtp,
      lastLogin: currentTime,
    });

    await mailer.mailer(email, mailType.OTP, String(userOtp));

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
  };

  /**
   * VerifyOtp
   * @param req
   * @param res
   * @returns
   */
  public loginWithOtp = async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    const userAccount = await user.getUserByEmail(email);
    if (!userAccount || userAccount.otp !== Number(otp))
      return res.status(403).json({ error: "Otp privided is not correct" });
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
  };

  /**
   * verifyEmail
   * @param req
   * @param res
   * @returns
   */
  public verifyEmail = async (req: Request, res: Response) => {
    const token = req.query.token as string;
    const payload = decode(token?.split(" ")[0] as string);

    const newUser = await user.getUserByEmail(payload.email);
    if (!newUser) return res.status(404).json({ error: "User does not exit" });

    const data = { emailVerified: true };
    const updatedUser = await user.updateUser(Number(newUser.id), data);

    const newToken = encode({ id: newUser.id, email: newUser.email });

    return res.status(200).json({
      message: "Email verified successfully",
      token: newToken,
      data: {
        id: newUser.id,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        emailVerified: newUser.emailVerified,
      },
    });
  };

  /**
   * ForgetMyPassword
   * @param req
   * @param res
   * @returns
   */
  public forgetPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const findUser = await user.getUserByEmail(email);
    if (!findUser)
      return res.status(404).json({ error: "No user found with such email" });

    // Send email here
    const token = encode({ id: findUser.id });
    await mailer.mailer(email, mailType.RESET, token);

    return res.status(200).json({
      message: "Check your email for reset link !!",
    });
  };

  public resetPassword = async (req: Request, res: Response) => {
    const token = req.query.token as string;
    const payload = decode(token?.split(" ")[0] as string);

    const newUser = await user.getOneUser(Number(payload.id));
    if (!newUser) return res.status(404).json({ error: "User does not exit" });

    const hashedPassword = await hashPassword(req.body.password);
    const updatedUser = await user.updateUser(Number(newUser.id), {
      password: hashedPassword,
    });

    const newToken = encode({ id: newUser.id, email: newUser.email });

    return res.status(200).json({
      message: "Password reset successfully",
      token: newToken,
      data: {
        id: newUser.id,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        emailVerified: newUser.emailVerified,
      },
    });
  };
}

export default AuthController;
