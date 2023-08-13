import * as UsersRepo from "../repository/users.js";
import {
  successResponse,
  errorResponse,
  errorServerResponse,
} from "../utils/response.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_AT = "kelas.com";
const SECRET_RT = "wahid-dwi-saputra";

export const register = async (request, response, next) => {
  try {
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    const saltRound = 10;
    const hashed = await bcrypt.hash(password, saltRound);
    const [result] = await UsersRepo.register(name, email, hashed);
    successResponse(response, "berhasil register", result.insertId);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllUsers = async (request, response, next) => {
  try {
    const [result] = await UsersRepo.getAllUsers();
    successResponse(response, "Ok", result);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (request, response, next) => {
  try {
    let id = request.params.id;
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    const [result] = await UsersRepo.updateUser(name, email, password, id);
    if (result.affectedRows > 0) {
      successResponse(response, "Data berhasil diubah", result.affectedRows);
    } else {
      errorResponse(response, "Data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (request, response, next) => {
  try {
    let id = request.params.id;
    const [result] = await UsersRepo.deleteUser(id);
    if (result.affectedRows > 0) {
      successResponse(response, "berhasil menghapus data", result.affectedRows);
    } else {
      errorResponse(response, "data tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const auth = async (request, response, next) => {
  try {
    let email = request.body.email;
    let pass = request.body.password;
    const [result] = await UsersRepo.getUserByEmail(email);
    const user = result[0];

    const match = await bcrypt.compare(pass, user.password);
    if (!match) return errorResponse(response, "Password salah", 400);
    let claims = {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    };
    // console.log(claims.id);
    const accessToken = jwt.sign(claims, SECRET_AT, { expiresIn: "15m" });
    const refreshToken = jwt.sign(claims, SECRET_RT, { expiresIn: "1d" });

    let userData = {
      id: user.user_id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
    };
    let responseData = {
      access_token: accessToken,
      refresh_token: refreshToken,
      user_data: userData,
    };
    successResponse(response, "Berhasil login", responseData);
  } catch (error) {
    next(error);
  }
};
