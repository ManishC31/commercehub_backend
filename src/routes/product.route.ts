import { Router } from "express";
import {
  createProductController,
  createProductRangeController,
  getProductRangeController,
  getProductsController,
} from "../controllers/product.controller.ts";

const router = Router();

router.post("/", createProductController);
router.get("/", getProductsController);
router.get("/product-range/:id", getProductRangeController);
router.post("/product-range", createProductRangeController);

export default router;
