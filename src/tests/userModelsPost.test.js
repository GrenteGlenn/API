import { jest, test, expect } from "@jest/globals";
import dotenv from "dotenv";

dotenv.config();

// Mock du module config (car à cause de ESM jest.mock ne fonctionne pas)
jest.unstable_mockModule("../config/index.js", () => ({
  default: { query: jest.fn() },
}));

// Import des modules APRES le mock
const { default: pool } = await import("../config/index.js");
const { createUserService } = await import("../models/userModels.js");

test("Insert a new user into the database", async () => {
  // simulation du comportement de la requête SQL
  pool.query.mockResolvedValue({
    rows: [{ id: 1, name: "glenn", email: "glenn@gmail.com" }],
  });

  const result = await createUserService("glenn", "glenn@gmail.com");

  expect(result).toEqual({ id: 1, name: "glenn", email: "glenn@gmail.com" });
  expect(pool.query).toHaveBeenCalledWith(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    ["glenn", "glenn@gmail.com"]
  );
});
