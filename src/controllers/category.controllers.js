import  Category  from "../models/category.model.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      payload: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { cid } = req.params;

    const category = await Category.findById(cid);

    res.status(200).json({
      success: true,
      payload: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export default { getAllCategories, getCategoryById };