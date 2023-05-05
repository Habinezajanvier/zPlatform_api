import request from "supertest";
import app from "../../src/app";
import { UserType } from "../../src/types";
import prisma from "../../src/db/prisma";
import { hashPassword, otp } from "../../src/helper";

describe("Login", () => {
  let userOtp: number;
  beforeAll(async () => {
    const hashedPassword = await hashPassword("test@123");
    userOtp = otp();
    const testAccount: UserType = {
      firstname: "testname1",
      lastname: "testlast",
      email: "test1@email.com",
      password: hashedPassword,
      emailVerified: true,
    };

    const otpAccount: UserType = {
      firstname: "testname1",
      lastname: "testlast",
      email: "test2@email.com",
      password: hashedPassword,
      emailVerified: true,
      otp: userOtp,
    };

    const users = await prisma.user.createMany({
      data: [testAccount, otpAccount],
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
  it("Should return 403 if otp is incorrect", async () => {
    const res = await request(app).post("/api/auth/login/otp").send({
      email: "test2@email.com",
      otp: otp(),
    });
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("error");
  });

  it("Should return a token upon a valid otp", async () => {
    const res = await request(app).post("/api/auth/login/otp").send({
      email: "test2@email.com",
      otp: userOtp,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.email).toBe("test2@email.com");
  });
});
