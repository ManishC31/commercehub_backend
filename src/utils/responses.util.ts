import { Response } from "express";

export const ApiResponse = (res: Response, message: string = "Operation Successful", code: number = 200, data: any = null) => {
  return res.status(code).json({
    success: true,
    message: message,
    data: data,
  });
};

export const ApiError = (res: Response, message: string = "Operation Failed", code: number = 500) => {
  return res.status(code).json({
    success: false,
    error: message,
  });
};
