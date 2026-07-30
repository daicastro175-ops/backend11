import {Router} from "express";
import productControllers from "../controllers/product.controllers.js";
import { exportProductsFile } from "../controllers/exports.controllers.js";

const router = Router();

router.get("/", productControllers.getAllProducts);
router.get("/export", exportProductsFile);
router.get("/:pid", productControllers.getProductById);
router.post("/", productControllers.createProduct);
router.put("/:pid", productControllers.updateProduct);
router.delete("/:pid", productControllers.deleteProduct);

export default router;
