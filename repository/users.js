import dbPool from "../utils/connection.js";

export const register = (name, email, password) => {
  let createdAt = new Date();
  const sql =
    "INSERT INTO users (name, email, password, created_at) VALUE (?, ?, ?, ?)";
  const value = [name, email, password, createdAt];

  return dbPool.query(sql, value);
};

export const getAllUsers = () => {
  const sql = "SELECT id, name, email, created_at FROM users";
  const result = dbPool.query(sql);

  return result;
};

export const updateUser = (name, email, password, id) => {
  let updatedAt = new Date();
  const sql =
    "UPDATE users SET name = ?, email = ?, password = ?, updated_at = ? WHERE id = ?";
  const value = [name, email, password, updatedAt, id];

  return dbPool.query(sql, value);
};

export const deleteUser = (id) => {
  const sql = "DELETE FROM users WHERE id = ?";
  const value = [id];

  return dbPool.query(sql, value);
};

export const getUserByEmail = (email) => {
  const sql = "SELECT id, email, password FROM users WHERE email = ?";
  return dbPool.query(sql, email);
};

export const updateRefreshToken = (id) => {
  const sql = "UPDATE users SET refresh_token = ? WHERE id = ?";
  const value = [id];
  return dbPool.query(sql, value);
};
