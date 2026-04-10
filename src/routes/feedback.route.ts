import { Router } from "express";
import { createFeedbackController, getProductFeedbackController } from "../controllers/feedback.controller.ts";

const router = Router();

router.get("/:id", getProductFeedbackController);
router.post("/", createFeedbackController);

export default router;
