import Seller from "../models/seller.model.js";

const getAllSellers = async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json({
            success: true,
            payload: sellers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export default {
    getAllSellers
};