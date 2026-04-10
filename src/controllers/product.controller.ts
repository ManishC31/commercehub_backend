import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createProduct, getAllProducts, getProductByName } from "../services/product.service.ts";
import { pool, withTransaction } from "../configs/db.config.ts";
import { ApiResponse } from "../utils/responses.util.ts";
import { deleteFeedbackByProductId } from "../services/feedback.service.ts";
import { deleteWishListByProductRange } from "../services/wishlist.service.ts";
import { createProductRange, getProductRangeByProductId } from "../services/productrange.service.ts";

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

export const deleteProductController = asyncHandler(async (req: Request, res: Response) => {
  const productId = Number(req.params.id);

  if (Number.isNaN(productId)) {
    throw new Error("Invalid product id");
  }

  await withTransaction(async (client) => {
    // delete product feedbacks
    await deleteFeedbackByProductId(client, productId);

    // delete from wishlists

    // delete from cart
    // delete from product range
    // delete from product
  });
});

export const getProductRangeController = asyncHandler(async (req: Request, res: Response) => {
  const productId = Number(req.params.id);

  if (Number.isNaN(productId)) {
    throw new Error("Invalid product id");
  }

  const productRanges = await getProductRangeByProductId(pool, productId);
  ApiResponse(res, "Product ranges fetched successfully", 200, productRanges);
});

export const createProductRangeController = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body.data;

  let ranges: any = [];
  await withTransaction(async (client) => {
    for (let i in data) {
      const newProductRange = await createProductRange(client, data[i]);
      ranges.push(newProductRange);
    }

    return ranges;
  });

  ApiResponse(res, "Product ranges added successfully", 200, ranges);
});
