import { Router } from "express";
import authRoutes from "./auth.route.ts";
import categoryRoutes from "./category.route.ts";
import productRoutes from "./product.route.ts";
import feedbackRoutes from "./feedback.route.ts";
import wishlistRoutes from "./wishlist.route.ts";

const router = Router();

router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/wishlist", wishlistRoutes);

export default router;
