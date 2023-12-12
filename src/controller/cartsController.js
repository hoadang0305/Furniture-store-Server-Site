const CartInfo = require('../models/Cart');

const getCart = async (req,res, next) => {
    try {

        let query = CartInfo.find({userId : req.user._id});
        if(!query){
          throw new Error("Dont have any products in the cart");
        }
        const cart = await query;
        res.json(cart);
      } catch (error) {
        next(error);
      }
}
const addProduct = async (req,res, next) => {
  try {
    const cart = await CartInfo.findOne({userId : req.user._id});
    if(cart.userId == undefined && cart.productList == undefined){
        const newCart = await CartInfo.create({
        userId: req.user._id,
        productList: [
          {
            productName: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            total: req.body.quantity * req.body.price
          }
        ]
      });
      if(!newCart) throw new Error("can't add product to cart");

      res.status(201).json(newCart);

    } else {
        const existingProduct = await CartInfo.findOne({
            userId: req.body.userId,
            'productList.productName': req.body.name
        });
        if (existingProduct) {
            throw new Error("Product already added to cart");
        }
        const newProduct = {
            productName: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price, // Giá sản phẩm mới
            total: req.body.quantity * req.body.price // Tính tổng giá trị sản phẩm mới
        };
        await CartInfo.updateOne(
            {userId: req.user._id },
            {$push: {productList: newProduct }})

        const updatedCart = await CartInfo.findOne({ userId: req.user._id });
        if(!updatedCart) throw new Error("cant update cart")
        res.status(201).json(updatedCart);
    }
    
  } catch (err) {
      next(err)
  }
}
/*
const updateCart = async(req,res,next)=> {
  try {
    const productId =  req.params.id;
    const product = await CartProduct.findById(productId);
    if(!product){
      throw new Error("This product does not exists in the cart");
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.quantity = req.body.quantity || product.quantity;
    product.total = req.body.quantity * req.body.price || product.total;
    const updatePro = await product.save(); 
    res.status(201).json({
        name: updatePro.name,
        price: updatePro.price,
        quantity: updatePro.quantity,
    });
  } catch (err) {
    next(err);
  }
}*/
const deleteProduct = async(req,res,next)=> {
  try {
    const cart = CartInfo.find({userId : req.user._id});
    if(!cart){
      throw new Error("Dont have any products in the cart");
    }
    const deletionResult = await CartInfo.productList.pull({productName: req.body.name});
    if (deletionResult) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      throw new Error("Failed to delete product");
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {getCart,addProduct,deleteProduct};