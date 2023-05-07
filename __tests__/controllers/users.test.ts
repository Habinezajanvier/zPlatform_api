import request from "supertest";
import app from "../../src/app";
import { UserType } from "../../src/types";
import prisma from "../../src/db/prisma";
import { hashPassword, otp, encode } from "../../src/helper";

describe("Users", () => {
  let token: string;
  let id: number;

  beforeAll(async () => {
    const hashedPassword = await hashPassword("test@123");
    const testAccount: UserType = {
      firstname: "testname3",
      lastname: "testlast",
      email: "test3@email.com",
      password: hashedPassword,
      emailVerified: true,
    };
    const user = await prisma.user.create({ data: testAccount });
    id = user.id;
    token = encode({ id: user.id, email: user.email });
  });

  it("Should return all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
  });
  it("Should return one user if id is provided", async () => {
    const res = await request(app)
      .get(`/api/users/${id}`)
      .set({ token: token });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.id).toBe(id);
  });
  it("Should update the user if exist", async () => {
    const res = await request(app)
      .put(`/api/users/${id}`)
      .send({
        firstname: "testname",
        lastname: "testUpdate",
      })
      .set({ token: token });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.id).toBe(id);
    expect(res.body.data.lastname).toBe("testUpdate");
  });
  it("Should return one's profile if token provided", async () => {
    const res = await request(app).get(`/api/users/me`).set({ token: token });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.id).toBe(id);
  });
  it("Should update the user if exist", async () => {
    const res = await request(app)
      .put("/api/users/update")
      .send({
        status: "verified",
      })
      .set({ token: token });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.id).toBe(id);
    expect(res.body.data.status).toBe("verified");
  });
  it("Should delete a user if id is provided", async () => {
    const res = await request(app)
      .delete(`/api/users/${id}`)
      .set({ token: token });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.id).toBe(id);
  });
  it("Should return 404 if no user found", async () => {
    const deleteUsers = prisma.user.deleteMany();
    await prisma.$transaction([deleteUsers]);
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
