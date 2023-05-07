import { User } from ".prisma/client";
import prisma from "../db/prisma";
import { UserType } from "../types";

const { user } = prisma;

/**
 * user services
 */
class UserServices {
  /**
   * exclude fields
   * @param user
   * @param keys
   * @returns
   */
  private exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[]
  ): Omit<User, Key> {
    for (let key of keys) {
      delete user[key];
    }
    return user;
  }

  /**
   * create new user
   * @param data
   * @returns
   */
  createUser = async (data: UserType) => {
    const result = await user.create({ data });
    return result;
  };

  /**
   * getAllUsers
   * @returns
   */
  getAllUsers = async () => {
    const users = await user.findMany();
    return users.map((user) => this.exclude(user, ["password", "otp"]));
  };

  /**
   * getOneUser by Id
   * @param id
   * @returns
   */
  getOneUser = async (id: number) => {
    const newUser = (await user.findUnique({
      where: { id },
    })) as User;
    return this.exclude(newUser, ["password", "otp"]);
  };

  /**
   * getUserByEmail
   * @param email
   * @returns
   */
  getUserByEmail = async (email: string) => {
    const newUser = await user.findUnique({
      where: { email },
    });
    return newUser;
  };

  /**
   * UpdateUser
   * @param id
   * @param data
   * @returns
   */
  updateUser = async (id: number, data: any) => {
    const updatedData = await user.update({
      where: { id },
      data: { ...data },
    });
    return updatedData;
  };

  /**
   * deleteUser
   * @param id
   * @returns
   */
  deleteUser = async (id: number) => {
    const deletedUser = await user.delete({
      where: { id },
    });
    return deletedUser;
  };
}

export default UserServices;
