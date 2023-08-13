import * as OrderItemsRepo from "../repository/order_item.js";
import {
  successResponse,
  errorResponse,
  errorServerResponse,
} from "../utils/response.js";

export const createOrderItem = async (request, response, next) => {
  try {
    let productId = request.body.product_id;
    let quantity = request.body.quantity;
    const [orderItems] = await OrderItemsRepo.createOrderItem(
      productId,
      quantity
    );
    successResponse(response, "berhasil menambahkan data", orderItems.insertId);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllOrderItems = async (request, response, next) => {
  try {
    const [orderItems] = await OrderItemsRepo.getAllOrderItems();
    successResponse(response, "Ok", orderItems);
  } catch (error) {
    next(error);
  }
};

export const updateOrderItem = async (request, response, next) => {
  try {
    let orderItemId = request.params.id;
    let productId = request.body.product_id;
    let quantity = request.body.quantity;
    const [orderItems] = await OrderItemsRepo.updateOrderItem(
      orderItemId,
      productId,
      quantity
    );
    if (orderItems.affectedRows > 0) {
      successResponse(
        response,
        "Data berhasil diubah",
        orderItems.affectedRows
      );
    } else {
      errorResponse(response, "Data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteOrderItem = async (request, response, next) => {
  try {
    let orderItemId = request.params.id;
    const [orderItems] = await OrderItemsRepo.deleteOrderItem(orderItemId);
    if (orderItems.affectedRows > 0) {
      successResponse(
        response,
        "berhasil menghapus data",
        orderItems.affectedRows
      );
    } else {
      errorResponse(response, "data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};
