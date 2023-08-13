import * as ProductsRepo from "../repository/products.js";
import multer from "multer";
import {
  successResponse,
  errorResponse,
  errorServerResponse,
} from "../utils/response.js";

export const createProduct = async (request, response, next) => {
  try {
    let name = request.body.name;
    let image = request.body.image;
    let price = request.body.price;
    let stock = request.body.stock;
    const [result] = await ProductsRepo.createProduct(
      name,
      price,
      stock,
      image
    );
    successResponse(response, "berhasil menambahkan data", result.insertId);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllProducts = async (request, response, next) => {
  try {
    const [result] = await ProductsRepo.getAllProducts();
    successResponse(response, "Ok", result);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (request, response, next) => {
  try {
    let id = request.params.id;
    let name = request.body.name;
    let image = request.body.image;
    let price = request.body.price;
    let stock = request.body.stock;
    const [result] = await ProductsRepo.updateProduct(
      name,
      price,
      stock,
      image,
      id
    );
    if (result.affectedRows > 0) {
      successResponse(response, "Data berhasil diubah", result.affectedRows);
    } else {
      errorResponse(response, "Data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (request, response, next) => {
  try {
    let id = request.params.id;
    const [result] = await ProductsRepo.deleteProduct(id);
    if (result.affectedRows > 0) {
      successResponse(response, "berhasil menghapus data", result.affectedRows);
    } else {
      errorResponse(response, "data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};
