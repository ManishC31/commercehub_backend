import { Router } from "express";
import {
  createProductController,
  createProductRangeController,
  getProductRangeController,
  getProductsController,
} from "../controllers/product.controller.ts";
import { imageUpload } from "../middlewares/multer.middleware.ts";

const router = Router();

router.post("/", imageUpload.array("file"), createProductController);
router.get("/", getProductsController);
router.get("/product-range/:id", getProductRangeController);
router.post("/product-range", createProductRangeController);

export default router;
