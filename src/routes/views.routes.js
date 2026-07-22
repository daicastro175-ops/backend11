
import { Router } from "express";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import Cart from "../models/cart.model.js"

const router = Router();

router.get("/", (req, res) => {

    res.render("home");

});


router.get("/categories", async (req, res) => {

    const categories = await Category.find().lean();

    res.render("category", {
        categories
    });

});


router.get("/categories/:id", async (req, res) => {

    const { id } = req.params;

    const category = await Category.findById(id).lean();

    const products = await Product.find({
        category: id
    })
    .populate("seller")
    .lean();

    res.render("products", {
        category,
        products
    });

});

router.get("/carts/:cid", async (req, res) => {
    const { cid } = req.params;

    const cart = await Cart.findById(cid)
        .populate("products.product")
        .lean();

    if (!cart) {
        return res.status(404).send("Carrito no encontrado");
    }

    res.render("cart", {
        products: cart.products
    });
});
export default router;
