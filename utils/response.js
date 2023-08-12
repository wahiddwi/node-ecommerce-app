export const successResponse = (response, message, data, status = 200) => {
  return response.status(status).json({
    code: status,
    message: message,
    data: data,
  });
};

export const errorResponse = (response, message, status = 400) => {
  return response.status(status).json({
    code: status,
    message: message,
  });
};

export const errorServerResponse = (response, message, status = 500) => {
  return response.status(status).json({
    code: status,
    message: message,
  });
};
