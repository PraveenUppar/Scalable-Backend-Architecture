import { it, describe, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../src/app.js";

describe("Tests the register functionality", () => {
  const endpoint = "/api/auth/register";
  const userPayload = {
    name: "John",
    email: "john@example.com",
    password: "123456",
  };

  it("should register a user", async () => {
    const res = await request(app).post(endpoint).send(userPayload);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      name: "John",
      email: "john@example.com",
    });
    expect(res.body._id).toBeDefined();
  });

  it("returns 400 with invalid email", async () => {
    const res = await request(app).post(endpoint).send({
      name: "John",
      email: "invalid-email",
      password: "123456",
    });
    expect(res.status).toBe(400);
  });

  it("returns a 400 with missing email and password", async () => {
    return request(app).post(endpoint).send({ name: "John" }).expect(400);
  });

  it("disallows duplicate emails", async () => {
    await request(app).post(endpoint).send(userPayload).expect(201);
    await request(app).post(endpoint).send(userPayload).expect(400);
  });

  it("should return a JWT cookie with the correct user ID upon registration", async () => {
    const res = await request(app).post(endpoint).send(userPayload);
    expect(res.status).toBe(201);

    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();

    const cookieArray = Array.isArray(cookies) ? cookies : [cookies!];

    const jwtCookie = cookieArray.find((cookie: string) =>
      cookie.startsWith("jwt=")
    );
    expect(jwtCookie).toBeDefined();

    const token = jwtCookie!.split(";")[0].split("=")[1];
    expect(token).toBeDefined();

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        userId: string;
      };
      expect(decoded.userId).toBeDefined();
      expect(decoded.userId).toEqual(res.body._id);
    } catch (err) {
      expect.fail("JWT verification failed");
    }
  });
});
