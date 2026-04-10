import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createCategory, getAllCategories, getCategoryById } from "../services/category.service.ts";
import { pool } from "../configs/db.config.ts";
import { ApiResponse } from "../utils/responses.util.ts";

export const getAllCategoriesController = asyncHandler(async (req: Request, res: Response) => {
  const categories = await getAllCategories(pool);
  ApiResponse(res, "Categories fetched successfully", 200, categories);
});

export const getCategoryByIdController = asyncHandler(async (req: Request, res: Response) => {
  const categoryId = req.params.id as string;

  if (Number.isNaN(categoryId)) {
    throw new Error("Invalid category id");
  }

  const category = await getCategoryById(pool, Number(categoryId));
  ApiResponse(res, "Category fetched successfully", 200, category);
});

export const createCategoryController = asyncHandler(async (req: Request, res: Response) => {
  const category = await createCategory(pool, { name: req.body.name });
  ApiResponse(res, "Category created successfully", 201, category);
});
