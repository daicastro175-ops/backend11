import Product from "../models/product.model.js";
import productUtils from "../utils/product.utils.js";
import { getIO } from "../utils/socket.js";
import exportDAO from "../dao/fs/export.dao.js";

const getProductsWithPopulate = async () => {
  return await Product.find()
    .populate("category")
    .populate("seller")
    .lean();
};
const syncFileSystem = async () => {
  const products = await Product.find().lean();
  await exportDAO.saveProducts(products);
};


const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    } = req.body;

    const product = await Product.create({
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    });

await syncFileSystem();
    const products = await getProductsWithPopulate();

    getIO().emit("productsUpdated", products);


    res.status(201).json({
      success: true,
      payload: product
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const { page, limit } = productUtils.getPagination(req.query);

    const filter = productUtils.getFilter(req.query.query);

    const sort = productUtils.getSort(req.query.sort);


    const result = await Product.paginate(filter, {
      page,
      limit,
      sort,
      populate: ["category", "seller"]
    });


    const links = productUtils.buildLinks(result, limit);


    res.status(200).json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: links.prevLink,
      nextLink: links.nextLink
    });


  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message
    });
  }
};


const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;


    const product = await Product.findById(pid)
      .populate("category")
      .populate("seller");


    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Producto no encontrado"
      });
    }


    res.status(200).json({
      success: true,
      payload: product
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;


    const updatedProduct = await Product.findByIdAndUpdate(
      pid,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );


    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        error: "Producto no encontrado"
      });
    }
    
    await syncFileSystem();

    const products = await getProductsWithPopulate();

    getIO().emit("productsUpdated", products);


    res.status(200).json({
      success: true,
      payload: updatedProduct
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;


    const deletedProduct = await Product.findByIdAndDelete(pid);


    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        error: "Producto no encontrado"
      });
    }
await syncFileSystem();

    const products = await getProductsWithPopulate();

    getIO().emit("productsUpdated", products);


    res.status(200).json({
      success: true,
      message: "Producto eliminado correctamente"
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


export default {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
};