import { jest, test, expect } from "@jest/globals";
import dotenv from "dotenv";

dotenv.config();

jest.unstable_mockModule("../config/index.js", () => ({
    default: { query: jest.fn() },
}));

const { default: pool } = await import("../config/index.js");
const { deleteUser } = await import("../models/userModels.js");

test("Delete user", async () => {
    pool.query.mockResolvedValue({
        rows: [{id: 1}],
    });

    const result = await deleteUser(1);

    expect(result).toEqual({ id: 1});
    expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [1]
    )
})