import * as OrdersRepo from "../repository/orders.js";
import {
  successResponse,
  errorResponse,
  errorServerResponse,
} from "../utils/response.js";

export const createorders = async (request, response, next) => {
  try {
    let orderItemId = request.body.order_item_id;
    let shippingAddress = request.body.shipping_address;
    const [orders] = await OrdersRepo.createOrder(orderItemId, shippingAddress);
    successResponse(response, "berhasil menambahkan data", orders.insertId);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllOrders = async (request, response, next) => {
  try {
    const [orders] = await OrdersRepo.getAllOrders();
    successResponse(response, "Ok", orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (request, response, next) => {
  try {
    let orderId = request.params.id;
    let orderItemId = request.body.order_item_id;
    let shippingAddress = request.body.shipping_address;
    const [orders] = await OrdersRepo.updateOrder(
      orderId,
      orderItemId,
      shippingAddress
    );
    if (orders.affectedRows > 0) {
      successResponse(response, "Data berhasil diubah", orders.affectedRows);
    } else {
      errorResponse(response, "Data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (request, response, next) => {
  try {
    let orderId = request.params.id;
    const [orders] = await OrdersRepo.deleteOrder(orderId);
    if (orders.affectedRows > 0) {
      successResponse(response, "berhasil menghapus data", orders.affectedRows);
    } else {
      errorResponse(response, "data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};
