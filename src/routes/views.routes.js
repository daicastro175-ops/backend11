import { Router } from "express";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import Cart from "../models/cart.model.js";

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

router.get("/categories/:cid", async (req, res) => {
    try {

        const { cid } = req.params;

        const category = await Category.findById(cid).lean();

        if (!category) {
            return res.status(404).send("Categoría no encontrada");
        }

        const products = await Product.find({
            category: cid
        })
        .populate("seller")
        .lean();

        res.render("products", {
            category,
            products
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/carts/:cid", async (req, res) => {
    try {
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

    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
