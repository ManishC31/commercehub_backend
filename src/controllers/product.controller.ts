import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createProduct, getAllProducts, getProductByName } from "../services/product.service.ts";
import { pool } from "../configs/db.config.ts";
import { ApiResponse } from "../utils/responses.util.ts";

export const createProductController = asyncHandler(async (req: Request, res: Response) => {
  // validate the title of the product
  const existingProduct = await getProductByName(pool, req.body.title);

  if (existingProduct) {
    throw new Error("Product with name already exists");
  }

  const newProduct = await createProduct(pool, req.body);

  ApiResponse(res, "Product created successfully", 201, newProduct);
});

export const getProductsController = asyncHandler(async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;

  const products = await getAllProducts(pool, limit, offset);

  ApiResponse(res, "Products fetched successfully", 200, products);
});

export const getProductDetailByIdController = asyncHandler(async (req: Request, res: Response) => {});
