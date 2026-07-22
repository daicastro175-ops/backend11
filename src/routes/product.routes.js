import express from "express";
import productControllers from "../controllers/product.controllers.js";

const router = express.Router();

router.get("/", productControllers.getAllProducts);
router.get("/:id", productControllers.getProductById);
router.post("/", productControllers.createProduct);
router.put("/:pid", productControllers.updateProduct);
router.delete("/:pid", productControllers.deleteProduct);

export default router;
