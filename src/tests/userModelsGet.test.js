import { jest, test, expect } from "@jest/globals";
import dotenv from "dotenv";

dotenv.config();

// Mock la bdd
jest.unstable_mockModule("../config/index.js", ()=> ({
    default: { query: jest.fn() },
}));

// import des modules APRES le mock
const { default: pool } = await import("../config/index.js");
const { getAllUsers } = await import("../models/userModels.js");

test("Get all users", async () => {
    pool.query.mockResolvedValue({
        rows: [{id: 1, name: "Glenn", email: "glenn@gmail.com" }],
    });
    const result = await getAllUsers();
    // Compare if return the same return to query bdd
    expect(result).toEqual([{id: 1, name: "Glenn", email: "glenn@gmail.com" }]);
    expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM users"
    );
});