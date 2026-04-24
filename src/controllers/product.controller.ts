import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createProduct, getAllProducts, getProductByName } from "../services/product.service.ts";
import { pool, withTransaction } from "../configs/db.config.ts";
import { ApiResponse } from "../utils/responses.util.ts";
import { deleteFeedbackByProductId } from "../services/feedback.service.ts";
import { deleteWishListByProductRange } from "../services/wishlist.service.ts";
import { createProductRange, getProductRangeByProductId } from "../services/productrange.service.ts";
import { uploadFileInCloudinary } from "../utils/cloudinary.util.ts";
import path from "path";
import { fileURLToPath } from "url";
import { deleteFileFromUploads } from "../utils/resources.utils.ts";

export const createProductController = asyncHandler(async (req: Request, res: Response) => {
  // validate the title of the product
  // const existingProduct = await getProductByName(pool, req.body.title);

  // if (existingProduct) {
  //   throw new Error("Product with name already exists");
  // }

  // upload images on cloudinary
  const imageUrls: string[] = [];

  if (req.files) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const files = req.files as Express.Multer.File[];
    for (const file of files) {
      const filePath = `${__dirname}/../../uploads/${file.filename}`;
      try {
        const result = await uploadFileInCloudinary({
          folderName: "products",
          filePath: filePath,
        });

        imageUrls.push(result.secure_url);
      } catch (error) {
        console.log("Failed to upload images:", error);
        throw error;
      } finally {
        // delete file from uploads folder
        await deleteFileFromUploads(filePath);
      }
    }
  }

  req.body.imageUrls = [...imageUrls];
  req.body.careInstructions = req.body.careInstructions.split(",");

  const newProduct = await createProduct(pool, req.body);
  ApiResponse(res, "Product created successfully", 201, newProduct);
});

export const getProductsController = asyncHandler(async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;

  const products = await getAllProducts(pool, limit, offset);

  ApiResponse(res, "Products fetched successfully", 200, products);
});

export const getProductDetailByIdController = asyncHandler(async (req: Request, res: Response) => {
  const productId = Number(req.params.id);

  if (Number.isNaN(productId)) {
    throw new Error("Invalid product id");
  }

  const productData = await getProductById(pool, productId)
  const productRangeDetails = await getProductInformationById(pool, [productId])
  
  ApiResponse(res, 'Product information fetched successfully', 200, {product: productData, range: productRangeDetails})
});

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
