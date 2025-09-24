import { it, describe, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../../src/app.js";
describe("Tests the login functionality", () => {
    const endpoint = "/api/auth/login";
    const registerEndpoint = "/api/auth/register";
    const userPayload = {
        name: "John Doe",
        email: "john.login@example.com",
        password: "password123",
    };
    beforeEach(async () => {
        await request(app).post(registerEndpoint).send(userPayload);
    });
    it("should log in a user with correct credentials and return a cookie", async () => {
        const res = await request(app).post(endpoint).send({
            email: userPayload.email,
            password: userPayload.password,
        });
        expect(res.status).toBe(200);
        expect(res.body.email).toEqual(userPayload.email);
        const cookies = res.headers["set-cookie"];
        expect(cookies).toBeDefined();
        const cookieArray = Array.isArray(cookies) ? cookies : [cookies];
        expect(cookieArray.some((cookie) => cookie.startsWith("jwt="))).toBe(true);
    });
    it("should return 401 for incorrect password", async () => {
        const res = await request(app).post(endpoint).send({
            email: userPayload.email,
            password: "wrongpassword",
        });
        expect(res.status).toBe(401);
    });
    it("should return 401 for a user that does not exist", async () => {
        const res = await request(app).post(endpoint).send({
            email: "nonexistent@example.com",
            password: "password123",
        });
        expect(res.status).toBe(401);
    });
    it("should return 400 for missing email or password", async () => {
        const res = await request(app).post(endpoint).send({});
        expect(res.status).toBe(400);
    });
});
//# sourceMappingURL=login.test.js.map