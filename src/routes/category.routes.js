import { Router } from "express";
import categoryController from "../controllers/category.controllers.js";

const router = Router();

router.get("/category", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);


//router.get("/products",productControllers.products)

export default router;