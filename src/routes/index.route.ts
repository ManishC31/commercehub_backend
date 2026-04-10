import { Router } from "express";
import authRoutes from "./auth.route.ts";
import categoryRoutes from "./category.route.ts";
import productRoutes from "./product.route.ts";
import feedbackRoutes from "./feedback.route.ts";

const router = Router();

router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.use("/feedback", feedbackRoutes);

export default router;
