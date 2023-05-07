import request from "supertest";
import app from "../../src/app";
import { UserType } from "../../src/types";
import prisma from "../../src/db/prisma";

describe("Signup", () => {
  const testAccount: UserType = {
    firstname: "testname",
    lastname: "testlast",
    email: "test@email.com",
    password: "test@123",
  };
  beforeAll(async () => {
    await prisma.user.create({
      data: {
        ...testAccount,
      },
    });
  });
  it("Should return 201 if account created successfully", async () => {
    const account: UserType = {
      firstname: "John",
      lastname: "Doe",
      email: "johndoe@email.com",
      password: "password@123",
    };
    const res = await request(app).post("/api/auth/signup").send(account);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.email).toEqual(account.email);
  });

  it("Should return 409 if the account exist", async () => {
    const res = await request(app).post("/api/auth/signup").send(testAccount);
    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("error");
  });

  it("Should return an 400 error if email is invalid", async () => {
    const account: UserType = {
      firstname: "John",
      lastname: "Doe",
      email: "invalidemail.com",
      password: "password@123",
    };
    const res = await request(app).post("/api/auth/signup").send(account);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("Should return an 400 error if password is'nt strong enough", async () => {
    const account: UserType = {
      firstname: "John",
      lastname: "Doe",
      email: "valid@email.com",
      password: "weak",
    };
    const res = await request(app).post("/api/auth/signup").send(account);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
