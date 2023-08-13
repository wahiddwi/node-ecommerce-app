import * as OrdersRepo from "../repository/orders.js";
import * as OrderItemsRepo from "../repository/order_item.js";
import {
  successResponse,
  errorResponse,
  errorServerResponse,
} from "../utils/response.js";

export const createorders = async (request, response, next) => {
  try {
    let productId = request.body.product_id;
    let quantity = request.body.quantity;
    const [orderItems] = await OrderItemsRepo.createOrderItem(
      productId,
      quantity
    );

    let orderItemId = orderItems.id;
    let shippingAddress = request.body.shipping_address;
    const [orders] = await OrdersRepo.createOrder(orderItemId, shippingAddress);
    successResponse(
      response,
      "berhasil menambahkan data",
      orderItems.insertId,
      orders.insertId
    );
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
    let orderItemId = request.params.id;
    let productId = request.body.product_id;
    let quantity = request.body.quantity;
    const [orderItems] = await OrderItemsRepo.updateOrderItem(
      orderItemId,
      productId,
      quantity
    );

    let orderId = request.params.id;
    let orderItemIds = orderItems.orderItemId;
    let shippingAddress = request.body.shipping_address;
    const [orders] = await OrdersRepo.updateOrder(
      orderId,
      orderItemIds,
      shippingAddress
    );
    if (orders.affectedRows > 0) {
      successResponse(
        response,
        "Data berhasil diubah",
        orders.affectedRows,
        orderItems.affectedRows
      );
    } else {
      errorResponse(response, "Data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (request, response, next) => {
  try {
    let orderItemId = request.params.id;
    let orderId = request.params.id;
    const [orderItems] = await OrderItemsRepo.deleteOrderItem(orderItemId);
    const [orders] = await OrdersRepo.deleteOrder(orderId);
    if (orders.affectedRows > 0) {
      successResponse(
        response,
        "berhasil menghapus data",
        orders.affectedRows,
        orderItems.affectedRows
      );
    } else {
      errorResponse(response, "data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};
