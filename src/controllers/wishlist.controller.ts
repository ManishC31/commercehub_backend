import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ApiError, ApiResponse } from "../utils/responses.util.ts";
import { createWishlist, getWishlistOfUser } from "../services/wishlist.service.ts";
import { pool } from "../configs/db.config.ts";

export const addIntoWishlistController = asyncHandler(async (req: Request, res: Response) => {
  const { userId, productRangeId } = req.body;

  if (Number.isNaN(userId)) {
    ApiError(res, "Invalid user id", 400);
  }

  if (Number.isNaN(productRangeId)) {
    ApiError(res, "Invalid product range id", 400);
  }

  const wishlist = await createWishlist(pool, req.body);

  ApiResponse(res, "Product added into wishlist", 200, wishlist);
});

export const getUserWishlistController = asyncHandler(async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  if (Number.isNaN(userId)) {
    ApiError(res, "Invalid user id", 400);
  }

  const products = await getWishlistOfUser(pool, userId);

  ApiResponse(res, "Wishlist of user fetched successfully", 200, products);
});
