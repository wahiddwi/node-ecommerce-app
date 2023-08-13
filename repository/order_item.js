import dbPool from "../utils/connection.js";

export const createOrderItem = (product_id, quantity) => {
  let createdAt = new Date();
  const sql =
    "INSERT INTO order_item (product_id, quantity, created_at) VALUE (?, ?, ?)";
  const value = [product_id, quantity, createdAt];

  return dbPool.query(sql, value);
};

export const getAllOrderItems = () => {
  const sql = "SELECT id, product_id, quantity, created_at FROM order_item";
  const result = dbPool.query(sql);

  return result;
};

export const updateOrderItem = (product_id, quantity, id) => {
  let updatedAt = new Date();
  const sql =
    "UPDATE order_item SET product_id = ?, quantity = ?, updated_at = ? WHERE id = ?";
  const value = [product_id, quantity, updatedAt, id];

  return dbPool.query(sql, value);
};

export const deleteOrderItem = (id) => {
  const sql = "DELETE FROM order_item WHERE id = ?";
  const value = [id];

  return dbPool.query(sql, value);
};
