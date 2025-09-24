import { it, describe, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("Tests the logout functionality", () => {
  const endpoint = "/api/auth/logout";
  const registerEndpoint = "/api/auth/register";
  const loginEndpoint = "/api/auth/login";
  const userPayload = {
    name: "Jane Doe",
    email: "jane.logout@example.com",
    password: "password123",
  };

  it("should log out a user and clear the JWT cookie", async () => {
    const agent = request.agent(app);

    await agent.post(registerEndpoint).send(userPayload).expect(201);

    const loginRes = await agent.post(loginEndpoint).send({
      email: userPayload.email,
      password: userPayload.password,
    });
    expect(loginRes.status).toBe(200);
    expect(loginRes.headers["set-cookie"]).toBeDefined();

    const logoutRes = await agent.post(endpoint).send();

    expect(logoutRes.status).toBe(200);
    expect(logoutRes.body.message).toEqual("User logged out successfully");

    const cookies = logoutRes.headers["set-cookie"];
    expect(cookies).toBeDefined();

    const cookieArray = Array.isArray(cookies) ? cookies : [cookies!];
    const clearedCookie = cookieArray.find((c) => c.startsWith("jwt="));

    expect(clearedCookie).toBeDefined();
    expect(clearedCookie).toContain("jwt=;");
    expect(clearedCookie).toContain("Expires=Thu, 01 Jan 1970");
  });

  it("should return a success message even if no user is logged in", async () => {
    const res = await request(app).post(endpoint).send();
    expect(res.status).toBe(200);
  });
});
