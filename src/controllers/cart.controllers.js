import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

const createCart = async (req, res) => {
  try {
    const cart = await Cart.create({
      products: []
    });

    res.status(201).json({
      success: true,
      payload: cart
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await Cart.findById(cid).populate("products.product");

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: "Carrito no encontrado"
      });
    }

    res.status(200).json({
      success: true,
      payload: cart
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: "Carrito no encontrado"
      });
    }

    const product = await Product.findById(pid);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Producto no encontrado"
      });
    }

    const existingProduct = cart.products.find(
      item => item.product.toString() === pid
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({
        product: pid,
        quantity: 1
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      payload: cart
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: "Carrito no encontrado"
      });
    }

    const productIndex = cart.products.findIndex(
      item => item.product.toString() === pid
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Producto no encontrado en el carrito"
      });
    }

    cart.products.splice(productIndex, 1);

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Producto eliminado del carrito",
      payload: cart
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const { products } = req.body;

    const cart = await Cart.findById(cid);

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: "Carrito no encontrado"
      });
    }

    cart.products = products;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Carrito actualizado correctamente",
      payload: cart
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cid);

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: "Carrito no encontrado"
      });
    }

    const product = cart.products.find(
      item => item.product.toString() === pid
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Producto no encontrado en el carrito"
      });
    }

    product.quantity = quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cantidad actualizada correctamente",
      payload: cart
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await Cart.findById(cid);

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: "Carrito no encontrado"
      });
    }

    cart.products = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Carrito vaciado correctamente",
      payload: cart
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export default {
  createCart, updateCart, updateProductQuantity,
  getCartById, addProductToCart, deleteProductFromCart, clearCart
};
