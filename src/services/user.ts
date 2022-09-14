import prisma from '../db/prisma';
import {UserType} from '../types';

const { user } = prisma;

/**
 * user services
 */
const userServices = {
  /**
   * create new user
   * @param data
   * @returns
   */
  createUser: async (data: UserType) => {
    const result = await user.create({ data });
    return result;
  },

  /**
   * getAllUsers
   * @returns
   */
  getAllUsers: async () => {
    const users = await user.findMany();
    return users;
  },

  /**
   * getOneUser by Id
   * @param id
   * @returns
   */
  getOneUser: async (id: number) => {
    const newUser = await user.findUnique({
      where: { id },
    });
    return newUser;
  },

  /**
   * getUserByEmail
   * @param email
   * @returns
   */
  getUserByEmail: async (email: string) => {
    const newUser = await user.findUnique({
      where: { email },
    });
    return newUser;
  },

  /**
   * UpdateUser
   * @param id
   * @param data
   * @returns
   */
  updateUser: async (id: number, data: any) => {
    const updatedData = await user.update({
      where: { id },
      data: { ...data },
    });
    return updatedData;
  },

  /**
   * deleteUser
   * @param id
   * @returns
   */
  deleteUser: async (id: number) => {
    const deletedUser = await user.delete({
      where: { id },
    });
    return deletedUser;
  },
};

export default userServices;
