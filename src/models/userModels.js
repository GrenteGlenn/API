import pool from "../config/index.js";

export const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const createUserService = async (name, email, role) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *",
    [name, email, role]
  );
  return result.rows[0];
};

export const updateUsers = async ( name, email, role, id) => {
  const result = await pool.query(
    // $1 and $2 is a placeholders secure to avoid inject SQL (same to request parameter)
    "UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *",
    [name, email, role, id]
  );
  return result.rows[0];
};

export const deleteUser = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
