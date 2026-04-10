import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createFeedback, getFeedbacksByProductId } from "../services/feedback.service.ts";
import { pool } from "../configs/db.config.ts";
import { ApiError, ApiResponse } from "../utils/responses.util.ts";

export const getProductFeedbackController = asyncHandler(async (req: Request, res: Response) => {
  const productId = Number(req.params.id);

  if (!productId) {
    ApiError(res, "Invalid product id", 400);
  }
  const feedbacks = await getFeedbacksByProductId(pool, productId);
  ApiResponse(res, "Feedbacks fetched successfully", 200, feedbacks);
});

export const createFeedbackController = asyncHandler(async (req: Request, res: Response) => {
  const feedback = await createFeedback(pool, req.body);
  ApiResponse(res, "Feedback created successfully", 201, feedback);
});
