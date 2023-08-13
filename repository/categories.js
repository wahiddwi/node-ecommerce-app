import dbPool from "../utils/connection.js";

export const createCategory = (name) => {
  let createdAt = new Date();
  const sql = "INSERT INTO category (name, created_at) VALUE (?, ?)";
  const value = [name, createdAt];

  return dbPool.query(sql, value);
};

export const getAllCategories = () => {
  const sql = "SELECT id, name, created_at FROM category";
  const result = dbPool.query(sql);

  return result;
};

export const updateCategory = (name, id) => {
  let updatedAt = new Date();
  const sql = "UPDATE category SET name = ?, updated_at = ? WHERE id = ?";
  const value = [name, updatedAt, id];

  return dbPool.query(sql, value);
};

export const deleteCategory = (id) => {
  const sql = "DELETE FROM category WHERE id = ?";
  const value = [id];

  return dbPool.query(sql, value);
};
