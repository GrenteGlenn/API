import request from "supertest";
import express from "express";
import usersRouter from '../routes/user.js';

// on crée une app Express temporaire
const app = express();
app.use(express.json());
app.use("/user", usersRouter);

describe("Test POST /user/create", () => {
  test("devrait renvoyer 400 si name ou email manquant", async () => {
    const res = await request(app)
      .post("/user/create")
      .send({ name: "Glenn", email: "glenn@gmail.com" });

    expect(res.statusCode);
  });
});
