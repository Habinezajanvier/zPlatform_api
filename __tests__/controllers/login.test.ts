import request from "supertest";
import app from "../../src/app";
import { UserType } from "../../src/types";
import prisma from "../../src/db/prisma";
import { hashPassword } from '../../src/helper';

describe("Login", () => {

  
  beforeAll(async () => {
    const hashedPassword = await hashPassword("test@123")
    const testAccount: UserType = {
        firstname: "testname1",
        lastname: "testlast",
        email: "test1@email.com",
        password: hashedPassword,
      };
    await prisma.user.create({
      data: {
        ...testAccount,
      },
    });
  });
  afterAll(async () => {
    const deleteUsers = prisma.user.deleteMany();
    await prisma.$transaction([deleteUsers]);
    await prisma.$disconnect();
  });

  it("Should return 200 if user logged in successfully", async () => {
    const res = await request(app).post("/api/auth/login").send({
        email: "test1@email.com",
        password: "test@123",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.email).toBe("test1@email.com");
  });
  it("Should return 403 if the account doesn't exist", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "notExist@email.com",
      password: "test@123",
    });
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("error");
  });
  it("Should return 403 if password is incorrect", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test1@email.com",
      password: "incorrect@123",
    });
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("error");
  });
});
