import Product from "../models/product.model.js";
import exportDAO from "../dao/fs/export.dao.js";

export const exportProductsFile = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category")
            .populate("seller")
            .lean();

        await exportDAO.saveProducts(products);

        res.status(200).json({
            success: true,
            message: "Productos exportados correctamente."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};