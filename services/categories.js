import * as CategoriesRepo from "../repository/categories.js";
import {
  successResponse,
  errorResponse,
  errorServerResponse,
} from "../utils/response.js";

export const createCategory = async (request, response, next) => {
  try {
    let name = request.body.name;
    const [result] = await CategoriesRepo.createCategory(name);
    successResponse(response, "berhasil menambahkan data", result.insertId);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllCategories = async (request, response, next) => {
  try {
    const [result] = await CategoriesRepo.getAllCategories();
    successResponse(response, "Ok", result);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (request, response, next) => {
  try {
    let id = request.params.id;
    let name = request.body.name;
    const [result] = await CategoriesRepo.updateCategory(name, id);
    if (result.affectedRows > 0) {
      successResponse(response, "Data berhasil diubah", result.affectedRows);
    } else {
      errorResponse(response, "Data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (request, response, next) => {
  try {
    let id = request.params.id;
    const [result] = await CategoriesRepo.deleteCategory(id);
    if (result.affectedRows > 0) {
      successResponse(response, "berhasil menghapus data", result.affectedRows);
    } else {
      errorResponse(response, "data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};
