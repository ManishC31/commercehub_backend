import { Router } from "express";
import { addIntoWishlistController, getUserWishlistController } from "../controllers/wishlist.controller.ts";

const router = Router();

router.post("/", addIntoWishlistController);
router.get("/:id", getUserWishlistController);

export default router;
