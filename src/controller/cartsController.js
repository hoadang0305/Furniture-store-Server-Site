const CartInfo = require('../models/Cart');

const getCart = async (req,res, next) => {
    try {
        let cart = await CartInfo.findOne({userId : req.user._id});
        if(!cart){
          throw new Error("Dont have any products in the cart");
        }
        res.json(cart.productList);
      } catch (error) {
        next(error);
      }
}
const addProduct = async (req,res, next) => {
  try {
    const cart = await CartInfo.findOne({userId : req.user._id});
    if(!cart){
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

      res.status(201).json(newCart.productList);

    } else {
        const existingProduct = await CartInfo.findOne({
            userId: req.user._id,
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
        res.status(201).json(updatedCart.productList);
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
    let cart = await CartInfo.findOne({userId : req.user._id});
    if(!cart){
        throw new Error("Don't have any items in cart");
    }
    // let existingProduct = null
    // cart.productList.forEach((arrObj) => {
    //   if (arrObj.productName === req.body.name) {

    //     existingProduct = arrObj;
        
    //   }
    // });
    const oldLegth = cart.productList.length;
    for(let i = 0; i < cart.productList.length; i ++ ){
        if(cart.productList[i].productName === req.body.name){
            cart.productList.splice(i,1);
            break;
        }
    }
    if(cart.productList.length === oldLegth) throw new Error("Your cart doesn't contain this product");
    else if(cart.productList.length === 0) {
        deleteCart = await CartInfo.deleteOne({_id : cart._id});
        if(deleteCart) res.status(201).json({message: "Your cart is empty"});
    } else if(cart.productList.length === oldLegth - 1){
        res.status(201).json(cart.productList);
    }
//   if (!existingProduct) {
//       throw new Error("Dont have this product in cart");
//     }
//     const deletionResult = await CartInfo.updateOne(
//       { userId: req.user._id},
//       { $pull: { productList: existingProduct} }
//     );    
//     if (deletionResult) {
//       cart = await CartInfo.findOne({userId : req.user._id})
//       if (cart.productList.length === 0)
//       { 
//         a = await CartInfo.deleteOne({ _id: cart._id});
//       } 
//       res.status(200).json();
//     } else {
//       throw new Error("Failed to delete product");
    //}
  } catch (err) {
    next(err);
  }
}

module.exports = {getCart,addProduct,deleteProduct};