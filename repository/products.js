import dbPool from "../utils/connection.js";

export const createProduct = (name, price, quantity, image) => {
  let createdAt = new Date();
  const sql =
    "INSERT INTO product (name, price, quantity, image, created_at) VALUE (?, ?, ?, ?, ?)";
  const value = [name, price, quantity, image, createdAt];

  return dbPool.query(sql, value);
};

export const getAllProducts = () => {
  const sql = "SELECT id, name, image, created_at FROM product";
  const result = dbPool.query(sql);

  return result;
};

export const updateProduct = (name, price, quantity, image, id) => {
  let updatedAt = new Date();
  const sql =
    "UPDATE product SET name = ?, price = ?, quantity = ?, image = ?, updated_at = ? WHERE id = ?";
  const value = [name, price, quantity, image, updatedAt, id];

  return dbPool.query(sql, value);
};

export const deleteProduct = (id) => {
  const sql = "DELETE FROM product WHERE id = ?";
  const value = [id];

  return dbPool.query(sql, value);
};
