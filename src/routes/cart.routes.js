import { Router } from "express";
import cartControllers from "../controllers/cart.controllers.js";

const router = Router();

router.post("/", cartControllers.createCart);
router.get("/:cid", cartControllers.getCartById);
router.post("/:cid/products/:pid", cartControllers.addProductToCart);
router.delete("/:cid/products/:pid", cartControllers.deleteProductFromCart);
router.put("/:cid", cartControllers.updateCart);
router.put("/:cid/products/:pid", cartControllers.updateProductQuantity);
router.delete("/:cid", cartControllers.clearCart);
export default router;