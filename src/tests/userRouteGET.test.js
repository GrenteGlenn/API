import request from "supertest";
import express from "express";
import usersRouter from '../routes/user.js';

// on crée une app Express temporaire
const app = express();
app.use(express.json());
app.use("/user", usersRouter);


describe("Test GET /user/", () => {
    test("Doit me renvoyer 200 et un tableau vide", async () => {
        const res = await request(app)
        .get("/user/")

    expect(res.statusCode).toBe(201);
    expect(Array.isArray(res.body.data)).toBe(true);
    });
});