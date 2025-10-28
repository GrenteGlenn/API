import { jest, test, expect } from "@jest/globals";
import dotenv from "dotenv";

dotenv.config();

jest.unstable_mockModule("../config/index.js", () => ({
    default: {query: jest.fn() },
}));

const { default: pool } = await import("../config/index.js");
const { updateUsers } = await import("../models/userModels.js");

test("Update a user", async () => {
    pool.query.mockResolvedValue({
        rows: [{ id: 1, name: "glenn", email: "glenn@gmail.com", role: "admin"}],
    });

    const result = await updateUsers("glenn", "glenn@gmail.com", "admin", 1);

    expect(result).toEqual({ id: 1, name: "glenn", email: "glenn@gmail.com", role: "admin"});
    expect(pool.query).toHaveBeenCalledWith(
       "UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *",
       ["glenn", 'glenn@gmail.com', 'admin', 1]
    );
});