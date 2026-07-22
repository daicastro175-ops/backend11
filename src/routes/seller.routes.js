import { Router } from "express";
import sellerControllers from "../controllers/seller.controllers.js";

const router = Router();

router.get("/", sellerControllers.getAllSellers);

export default router;