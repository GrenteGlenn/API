import request from "supertest";
import express from "express";
import usersRouter from '../routes/user.js';

// on crée une app Express temporaire
const app = express();
app.use(express.json());
app.use("/user", usersRouter);

describe("Test Delete /user/:id", () => {
    test("Doit me retourner 200", async () => {
        const res = await request(app)
        .delete("/user/1")
    expect(res.status).toBe(200);
    })
})