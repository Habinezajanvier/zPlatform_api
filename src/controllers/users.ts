import { Request, Response } from "express";
import Services from "../services";

const { user } = Services;

class UserController{
  /**
   * Get All users
   * @param req
   * @param res
   * @returns
   */
  public getAllUsers = async (req: Request, res: Response) => {
    const data = await user.getAllUsers();
    if (!data || data.length === 0)
      return res.status(404).json({ error: "No user found" });
    return res.status(200).json({
      message: "Users found successfully",
      data,
    });
  }

  /**
   * GetOneUser
   * @param req
   * @param res
   * @returns
   */
  public getOneUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await user.getOneUser(Number(id));
    return res.status(200).json({
      message: "User found successfully",
      data,
    });
  }

  /**
   * Update user
   * @param req
   * @param res
   * @returns
   */
  public updateUser= async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await user.updateUser(Number(id), { ...req.body });
    return res.status(200).json({
      message: "User updated successfully",
      data,
    });
  }

  /**
   * Delete user
   * @param req
   * @param res
   * @returns
   */
  public deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await user.deleteUser(Number(id));
    return res.status(200).json({
      message: "User deleted successfully",
      data,
    });
  }

  /**
   * GetSelf Profile
   * @param req
   * @param res
   * @returns
   */
  public getSelfProfile = async (req: Request, res: Response) => {
    const { id } = req.user;
    const data = await user.getOneUser(Number(id));
    return res.status(200).json({
      message: "User found successfully",
      data,
    });
  }

  /**
   * Update user
   * @param req
   * @param res
   * @returns
   */
   public updateSelf = async (req: Request, res: Response) => {
    const { id } = req.user;
    const data = await user.updateUser(Number(id), { ...req.body });
    return res.status(200).json({
      message: "User updated successfully",
      data,
    });
  }
};

export default UserController;
