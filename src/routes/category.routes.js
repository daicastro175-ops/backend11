import { Router } from "express";
import categoryController from "../controllers/category.controllers.js";

const router = Router();

router.get("/", categoryController.getAllCategories);
router.get("/:cid", categoryController.getCategoryById);

export default router;