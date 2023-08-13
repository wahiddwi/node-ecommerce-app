import dbPool from "../utils/connection.js";

export const createOrder = (order_item_id, shipping_address) => {
  let createdAt = new Date();
  const sql =
    "INSERT INTO orders (order_item_id, shipping_address, created_at) VALUE (?, ?, ?)";
  const value = [order_item_id, shipping_address, createdAt];

  return dbPool.query(sql, value);
};

export const getAllOrders = () => {
  const sql =
    "SELECT id, order_item_id, shipping_address, created_at FROM orders";
  const result = dbPool.query(sql);

  return result;
};

export const updateOrder = (order_item_id, shipping_address, id) => {
  let updatedAt = new Date();
  const sql =
    "UPDATE orders SET order_item_id = ?, shipping_address = ?, updated_at = ? WHERE id = ?";
  const value = [order_item_id, shipping_address, updatedAt, id];

  return dbPool.query(sql, value);
};

export const deleteOrder = (id) => {
  const sql = "DELETE FROM orders WHERE id = ?";
  const value = [id];

  return dbPool.query(sql, value);
};
